import fetchKey from '../model/fetchKey.js';
import client from '../config/dbConnection.js';

const validateKey = async (key) => {
    if (!key) {
        return ("Api key required to make api call");
    } else {
        const record = await fetchKey(key);
        if (record) {
            if (record.tokens < 1) {
                return ("Api key doesn't have enough tokens to make api call");
            }
        } else {
            return ("Api key entered doesn't exist");
        }
    }
    return ("success");
}

const makeApiCall = async (req, res) => {
    const {key} = req.body;
    const status = await validateKey(key);
    if (status !== "success") {
        res.status(403).send(status);
    } else {
        const query = `UPDATE "api_key" SET tokens= tokens - 1 WHERE key='${key}'`;
        client.query(query);
        res.send("able to make api call");
    }
}

export default makeApiCall;