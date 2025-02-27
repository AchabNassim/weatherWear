import verifyToken from "../lib/helpers/verifyToken.js";
import { fetchRefToken, invalidateToken, blockRefTokens } from "../queries/refTokenQueries.js";

const refreshToken = async (req, res, next) => {
    // check if authorization header is present
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = verifyToken(token, "refresh");
        // check if the token is valid and was provided by the server
        if (decoded) {
            const record = await fetchRefToken(token);
            // check whether the token hasn't been used before
            if (record) {
                if (record.used_status === false) {
                    invalidateToken(token);
                    res.locals.user = decoded;
                    next();
                } else {
                    blockRefTokens(decoded.id);
                    res.status(403).send("Refresh token has been compromised.")
                }
            }
        } else {
            res.status(401).send();
        }
    } else {
        res.status(401).send();
    }
}

export default refreshToken;