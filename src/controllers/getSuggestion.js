import setCache from '../lib/helpers/setCache.js';
import retrieveCache from '../lib/helpers/retrieveCache.js';
import redisClient from '../config/redisConnection.js';
import { fetchKey, decrementToken } from '../queries/keyQueries.js';
import { insertHistory } from '../queries/userHistoryQueries.js';

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
    let suggestion = [];

    const data = await redisClient.get("suggestions");
    const parsedData = await JSON.parse(data);

    switch (true) {
        case (temperature >= 24) :
            suggestion.push(parsedData.summer);
            break ;
        case (temperature >= 16 && temperature < 24):
            suggestion.push(parsedData.spring_fall);
            break ;
        case (temperature < 16):
            suggestion.push(parsedData.winter);
            break ;
        default:
            break;
    }
    if (condition.includes("rain") || condition.includes("snow")) {
        if (temperature < 16) {
            suggestion.push(parsedData.cold_and_wet);
        } else {
            suggestion.push(parsedData.rainy);
        }
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
        return (JSON.stringify(suggestion));
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
        const cache = await retrieveCache(city);
        let result = null;

        if (cache) {
            result = cache;
        } else {
            result = await apiCall(city);
            setCache(city, result);
        }
        decrementToken(key);
        insertHistory(key, city, result);

        if (result && Object.keys(result).length > 0)
            res.send(result);
        else
            res.status(400).send("Bad request");
    }
}

export default getSuggestion;