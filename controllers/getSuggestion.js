import fs from 'node:fs';
import path from 'path';
import fetchKey from '../model/fetchKey.js';
import decrementToken from '../model/decrementToken.js';
import insertHistory from '../model/insertHistory.js';

const suggestionsPath = path.resolve(import.meta.dirname, '../suggestions.json');

const validateKey = async (key) => {
    if (!key) {
        return ("Api key required to make api call");
    } else {
        const record = await fetchKey(key);
        if (record) {
            if (record.tokens < 1) {
                return ("Api key doesn't have enough tokens to make api call");
            }
        } else {
            return ("Api key entered doesn't exist");
        }
    }
    return ("success");
}

const makeSuggestion = async (result) => {
    const temperature = result.current.temp_c;
    const condition = result.current.condition.text;
    let suggestion = {};

    const data = await fs.promises.readFile(suggestionsPath, {encoding: 'utf8'});
    const parsedData = await JSON.parse(data);

    switch (true) {
        case (temperature >= 24) :
            suggestion = {...parsedData.summer}
            break ;
        case (temperature >= 16 && temperature < 24):
            suggestion = {...parsedData.spring_fall}
            break ;
        case (temperature < 16):
            suggestion = {...parsedData.winter}
            break ;
        default:
            break;
    }
    return (suggestion);
}

const apiCall = async (city) => {
    const uri = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`;
    try {
        const res = await fetch(uri);
        if (res.status >= 400) {
            const error = new Error();
            error.status = res.status;
            throw error;
        }
        const result = await res.json();
        const suggestion = await makeSuggestion(result);
        return (suggestion);
    } catch (e) {
        return ([]);
    }
}

const getSuggestion = async (req, res) => {
    const {key, city} = req.body;
    const status = await validateKey(key);
    if (status !== "success" || !city) {
        res.status(403).send(status);
    } else {
        const result = await apiCall(city);
        decrementToken(key);
        insertHistory(key, city, result);

        if (Object.keys(result).length > 0)
            res.send(result);
        else
            res.status(400).send("Bad request");
    }
}

export default getSuggestion;