import client from '../config/dbConnection.js'

export const fetchUser = async (email) => {
    const query = `SELECT * FROM \"user\" WHERE email='${email}'`
    const result = await client.query(query);
    return (result.rows[0] ? result.rows[0] : undefined);
}

export const insertUser = async (id, name, email, password) => {
    const query = `INSERT INTO \"user\"(id, name, email, password) VALUES ('${id}', '${name}', '${email}', '${password}')`;
    const result = client.query(query);
}

export const accountExists = async (email) => {
    const query = `SELECT * FROM \"user\" WHERE email='${email}'`;
    const result = await client.query(query);
    return (result.rows.length > 0);
}

