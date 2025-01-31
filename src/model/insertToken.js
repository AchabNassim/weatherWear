import client from "../config/dbConnection.js";

const insertRefreshToken = async (userId, token) => {
    const query = `INSERT INTO "refresh_token"(user_id, token, used_status) VALUES ('${userId}', '${token}', FALSE)`;
    const result = client.query(query);
}

export default insertRefreshToken;