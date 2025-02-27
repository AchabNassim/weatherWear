import redisClient from "../../config/redisConnection.js";

const retrieveCache = async (city) => {
    try {
        const result = await redisClient.get(city);
        const parsedResult = await JSON.parse(result);
        return (parsedResult);
    } catch (e) {
        console.error("problems connecting to redis server");
    }
};

export default retrieveCache;