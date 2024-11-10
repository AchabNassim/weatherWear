import client from '../config/dbConnection.js'

const fetchKeyById = async (userId) => {
    const query = `SELECT * FROM "api_key" WHERE user_id=${userId}`
    const result = await client.query(query);
    return (result.rows[0] ? result.rows[0] : undefined);
}

export default fetchKeyById;