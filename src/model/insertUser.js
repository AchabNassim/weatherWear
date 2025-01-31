import client from '../config/dbConnection.js'

const insertUser = async (id, name, email, password) => {
    const query = `INSERT INTO "user"(id, name, email, password) VALUES ('${id}', '${name}', '${email}', '${password}')`;
    const result = client.query(query);
}

export default insertUser;