import client from "../config/dbConnection.js";
import { fetchKey } from "./keyQueries.js";

export const fetchUserHistory = async (userId) => {
    const query = `SELECT request_city, response, date, used_key FROM "api_history" WHERE user_id='${userId}'`;
    const result = await client.query(query);
    return (result.rows);
};

export const insertHistory = async (key, city, response) => {
    const user = await fetchKey(key);
    const query = `INSERT INTO "api_history"(user_id, used_key, request_city, response) VALUES ('${user.user_id}', '${key}', '${city}', '${JSON.stringify(response)}')`;
    const result = client.query(query);
}