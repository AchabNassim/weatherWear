import client from '../config/dbConnection.js'

const accountExists = async (email) => {
    const query = `SELECT * FROM \"user\" WHERE email='${email}'`;
    const result = await client.query(query);
    return (result.rows.length > 0);
}

export default accountExists;