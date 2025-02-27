import jwt from 'jsonwebtoken';

const verifyToken = (token, type) => {
    let decoded;
    if (type === "access") {
        try {
            decoded = jwt.verify(token, process.env.ACC_TOKEN_SECRET);
        } catch (e) {
            return (null);
        }
    } else {
        try {
            decoded = jwt.verify(token, process.env.REF_TOKEN_SECRET);
        } catch (e) {
            return (null);
        }
    }
    return (decoded);
};

export default verifyToken;