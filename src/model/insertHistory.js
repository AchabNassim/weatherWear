import client from "../config/dbConnection.js";
import fetchKey from "./fetchKey.js";

const insertHistory = async (key, city, response) => {
    const user = await fetchKey(key);
    const query = `INSERT INTO "api_history"(user_id, used_key, request_city, response) VALUES ('${user.user_id}', '${key}', '${city}', '${JSON.stringify(response)}')`;
    const result = client.query(query);
}

export default insertHistory;