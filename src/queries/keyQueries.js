import client from "../config/dbConnection.js";

export const fetchKeyById = async (userId) => {
    const query = `SELECT * FROM "api_key" WHERE user_id='${userId}'`
    const result = await client.query(query);
    return (result.rows[0] ? result.rows[0] : undefined);
}

export const fetchKey = async (key) => {
    const query = `SELECT * FROM "api_key" WHERE key='${key}'`
    const result = await client.query(query);
    return (result.rows[0] ? result.rows[0] : undefined);
}

export const insertKey = async (userId, key) => {
    const query = `INSERT INTO "api_key"(user_id, key, tokens) VALUES ('${userId}', '${key}', ${1000})`;
    const result = client.query(query);
}

export const modifyKey = async (userId, newKey) => {
    console.log(userId, newKey);
    const query = `UPDATE "api_key" SET key='${newKey}' WHERE user_id='${userId}'`
    const result = client.query(query);
};

export const decrementToken = async (key) => {
    const query = `UPDATE "api_key" SET tokens= tokens - 1 WHERE key='${key}'`;
    const result = client.query(query);
};

