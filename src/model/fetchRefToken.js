import client from '../config/dbConnection.js'

const fetchRefToken = async (token) => {
    const query = `SELECT * FROM "refresh_token" WHERE token='${token}'`
    const result = await client.query(query);
    return (result.rows[0] ? result.rows[0] : undefined);
}

export default fetchRefToken;