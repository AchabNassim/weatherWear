import client from '../config/dbConnection.js'

const fetchUser = async (email) => {
    const query = `SELECT * FROM "user" WHERE email='${email}'`
    const res = await client.query(query);
    return (res.rows[0]);
}

export default fetchUser;