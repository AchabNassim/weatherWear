import verifyToken from "../helpers/verifyToken.js";

const authenticate = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.sendStatus(401);
            return ;
        }
        const decoded = verifyToken(token, "access");
        if (decoded) {
            res.locals.user = decoded;
            next();
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(500);
    }
};

export default authenticate;