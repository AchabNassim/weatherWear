import jwt from "jsonwebtoken";
import { insertRefreshToken } from "../../queries/refTokenQueries.js";

export const genAccessToken = (user) => {
    const token = jwt.sign({
        id: user.id,
        name: user.name
    }, 
        process.env.ACC_TOKEN_SECRET, {
        expiresIn: '1h'
    });
    return token;
}

export const genRefreshToken = (user) => {
    const token = jwt.sign({
        id: user.id,
        name: user.name
    }, 
        process.env.REF_TOKEN_SECRET, {
        expiresIn: '7d'
    });
    insertRefreshToken(user.id, token);
    return token;
}