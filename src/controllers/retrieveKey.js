import { fetchKey } from '../queries/keyQueries.js';

const retrieveKey = async (req, res) => {
    const {key} = req.body;
    if (key) {
        const record = await fetchKey(key);
        if (record) {
            res.send(JSON.stringify({
                key : record.key,
                date: record.creation_date,
                tokens: record.tokens
            }));
        } else {
            res.status(404).send("Requested key was not found");
        }
    } else {
        res.status(400).send("No key was entered");
    }
}

export default retrieveKey;