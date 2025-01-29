import client from '../config/dbConnection.js'

const fetchUser = async (email) => {
    const query = `SELECT * FROM "user" WHERE email='${email}'`
    const result = await client.query(query);
    return (result.rows[0] ? result.rows[0] : undefined);
}

export default fetchUser;