import client from "../config/dbConnection.js";

const insertKey = async (userId, key) => {
    const query = `INSERT INTO "api_key"(user_id, key, tokens) VALUES (${userId}, '${key}', ${30})`;
    const result = await client.query(query);
}

export default insertKey;