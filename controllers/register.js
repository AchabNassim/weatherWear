import client from "../config/dbConnection.js";
import bcrypt from "bcrypt";

const validateData = (name, email, password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])(?=.*\d).+$/;
    const emailRegex = /^[\w._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!name || !email || !password) {
        return (false);
    }
    if (!emailRegex.test(email) || password.length < 8 || !passwordRegex.test(password)) {
        return (false);
    }
    return (true);
};

const accountExists = async (email) => {
    const query = `SELECT * FROM \"user\" WHERE email='${email}'`;
    const res = await client.query(query);
    return (res.rows.length > 0);
}

const insertUser = async (name, email, password) => {
    const query = `INSERT INTO "user"(name, email, password) VALUES ('${name}', '${email}', '${password}')`;
    const res = await client.query(query);
}

const getUserId = async (email) => {
    const query = `SELECT id FROM "user" WHERE email='${email}'`
    const res = await client.query(query);
    // console.log(res.rows);
    return (res.rows[0].id);
}

const register = async (req, res) => {
    if (req.session.user_id) {
        res.status(401).send("User already authenticated");
    } else {
        const {name, email, password} = req.body;
        if (!validateData(name, email, password)) {
            res.status(400).send("Invalid data, make sure the password contains at least One uppercase letter, one number and one special character");
        }
        if (await accountExists(email)) {
            res.status(403).send("Email already exists in database");
            return ;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        insertUser(name, email, hashedPassword);
        req.session.user_id = getUserId(email);
        res.send();
    }
}

export default register;