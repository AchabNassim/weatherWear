import bcrypt from "bcrypt";
import accountExists from '../model/accountExists.js'
import insertUser from "../model/insertUser.js"
import { v4 as uuidv4 } from 'uuid';

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

const register = async (req, res, next) => {
    const {name, email, password} = req.body;
    if (!validateData(name, email, password)) {
        res.status(400).send("Invalid data, make sure the password contains at least One uppercase letter, one number and one special character");
    }
    if (await accountExists(email)) {
        res.status(403).send("Email already exists in database");
        return ;
    }

    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    insertUser(id, name, email, hashedPassword);

    res.locals.user = {
        id: id,
        name: name
    }
    next();
}

export default register;