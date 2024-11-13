import client from "../config/dbConnection.js";

const fetchUserHistory = async (userId) => {
    const query = `SELECT * FROM "api_history" WHERE user_id=${userId}`;
    const result = await client.query(query);
    // console.log(result.rows);
    return (result.rows);
};

export default fetchUserHistory;