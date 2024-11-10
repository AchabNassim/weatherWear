import client from "../config/dbConnection.js";

const insertKey = async (userId, key) => {
    const query = `INSERT INTO "api_key"(user_id, key, tokens) VALUES (${userId}, '${key}', ${30})`;
    const res = await client.query(query);
    return (res);
}

export default insertKey;