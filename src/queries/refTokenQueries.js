import client from "../config/dbConnection.js";

export const fetchRefToken = async (token) => {
    const query = `SELECT * FROM "refresh_token" WHERE token='${token}'`
    const result = await client.query(query);
    return (result.rows[0] ? result.rows[0] : undefined);
}

export const insertRefreshToken = async (userId, token) => {
    const query = `INSERT INTO "refresh_token"(user_id, token, used_status) VALUES ('${userId}', '${token}', FALSE)`;
    const result = client.query(query);
}

export const blockRefTokens = async (userId) => {
    const query = `UPDATE "refresh_token" SET used_status = TRUE WHERE user_id='${userId}'`;
    const result = client.query(query);
}

export const invalidateToken = async (token) => {
    const query = `UPDATE "refresh_token" SET used_status = TRUE WHERE token = '${token}'`;
    const result = client.query(query);
}

