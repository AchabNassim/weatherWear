import fetchKey from '../model/fetchKey.js';
import decrementToken from '../model/decrementToken.js';


const validateKey = async (key, city) => {
    if (!key || !city) {
        return ("Api key and city required to make api call");
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

const makeSuggestion = async (city, category) => {
    const uri = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`;
    
}

const getSuggestion = async (req, res) => {
    const {key, city} = req.body;
    const status = await validateKey(key, city);
    if (status !== "success") {
        res.status(403).send(status);
    } else {
        res.send();
    }
}

export default getSuggestion;