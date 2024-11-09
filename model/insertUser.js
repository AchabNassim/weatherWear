import client from '../config/dbConnection.js'

const insertUser = async (name, email, password) => {
    const query = `INSERT INTO "user"(name, email, password) VALUES ('${name}', '${email}', '${password}')`;
    const res = await client.query(query);
    return (res);
}

export default insertUser;