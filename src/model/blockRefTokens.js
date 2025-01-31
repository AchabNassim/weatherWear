import client from "../config/dbConnection.js";

const blockRefTokens = async (userId) => {
    const query = `UPDATE "refresh_token" SET used_status = TRUE WHERE user_id='${userId}'`;
    const result = client.query(query);
}

export default blockRefTokens;