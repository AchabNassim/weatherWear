import client from '../config/dbConnection.js'

const accountExists = async (email) => {
    const query = `SELECT * FROM \"user\" WHERE email='${email}'`;
    const res = await client.query(query);
    return (res.rows.length > 0);
}

export default accountExists;