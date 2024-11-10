import client from "../config/dbConnection.js";

const fetchKey = async (key) => {
    const query = `SELECT * FROM "api_key" WHERE key='${key}'`
    const result = await client.query(query);
    return (result.rows[0] ? result.rows[0] : undefined);
}

export default fetchKey;