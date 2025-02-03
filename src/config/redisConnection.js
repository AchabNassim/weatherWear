import { createClient } from "redis";

const connect = async () => {
    const client = await createClient({url: "redis://localhost:6379"}).
        on('error', err => console.log('Redis Client Error', err))
        .connect();
    return (client);
};

const redisClient = await connect();

export default redisClient;