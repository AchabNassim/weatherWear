import client from "../config/dbConnection.js";

const insertKey = async (userId, key) => {
    const query = `INSERT INTO "api_key"(user_id, key, tokens) VALUES ('${userId}', '${key}', ${1000})`;
    const result = client.query(query);
}

export default insertKey;