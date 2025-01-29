import client from '../config/dbConnection.js'

const insertUser = async (name, email, password) => {
    const query = `INSERT INTO "user"(name, email, password) VALUES ('${name}', '${email}', '${password}')`;
    const result = await client.query(query);
}

export default insertUser;