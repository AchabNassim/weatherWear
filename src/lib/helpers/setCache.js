import redisClient from "../../config/redisConnection.js";

const setCache = (city, result) => {
    try {
        const jsonResult = JSON.stringify(result);
        redisClient.set(city, jsonResult, {EX: 86400 });
    } catch (e) {
        console.error("problems connecting to redis server");
    }
};

export default setCache;