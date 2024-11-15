import client from "../config/dbConnection.js";

const fetchUserHistory = async (userId) => {
    const query = `SELECT request_city, response, date, used_key FROM "api_history" WHERE user_id=${userId}`;
    const result = await client.query(query);
    return (result.rows);
};

export default fetchUserHistory;