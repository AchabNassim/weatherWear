import fetchKeyById from '../model/fetchKeyById.js';

const retrieveKeyById = async (req, res) => {
    if (!req.session.user_id) {
        res.status(401).send("User is not authenticated");
        return ;
    }
    const record = await fetchKeyById(req.session.user_id);
    if (!record) {
        res.status(403).send("User doesn't have a key");
    } else {
        res.send(JSON.stringify({
            key : record.key,
            date: record.creation_date,
            tokens: record.tokens
        }));
    }
}

export default retrieveKeyById;