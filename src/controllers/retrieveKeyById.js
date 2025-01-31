import fetchKeyById from '../model/fetchKeyById.js';

const retrieveKeyById = async (req, res) => {
    const id = res.locals.user.id;
    const record = await fetchKeyById(id);
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