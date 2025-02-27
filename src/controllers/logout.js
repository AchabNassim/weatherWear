import verifyToken from "../lib/helpers/verifyToken.js";
import { invalidateToken } from "../queries/refTokenQueries.js";

const logout = async (req, res) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = verifyToken(token, "refresh");
        if (decoded) {
            invalidateToken(token);
            res.send("Success");
        } else {
            res.status(403).send();
        }
    } else {
        res.status(403).send();
    }
}

export default logout;