import redisClient from "../../config/redisConnection.js";
import fs from 'node:fs';
import path from 'path';

const suggestionsPath = path.resolve(import.meta.dirname, '../../suggestions.json')

const storeSuggestions = async () => {
    try {
        const data = await fs.promises.readFile(suggestionsPath, {encoding: 'utf8'});
        const parsedData = await JSON.parse(data);
        redisClient.set("suggestions", JSON.stringify(parsedData));
    } catch (e) {
        console.error(e);
        exit (1);
    }
};

export default storeSuggestions;