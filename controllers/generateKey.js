import { v4 as uuidv4 } from 'uuid';
import insertKey from "../model/insertKey.js";
import fetchKeyById from '../model/fetchKeyById.js';
import fetchKey from '../model/fetchKey.js';

const generateKey = async (req, res) => {
    if (!req.session.user_id) {
        res.status(401).send("User is not authenticated");
        return ;
    }
    const record = await fetchKeyById(req.session.user_id);
    if (!record) {
        const key = uuidv4();
        const record = fetchKey(key);
        if (record) {
            res.status(500).send("Server internal error, please try again");
        } else {
            const result = await insertKey(req.session.user_id, key);
            res.send(`Generated key successfully "${key}"`);
        }
    } else {
        res.status(403).send("User already has a key");
    }
}

export default generateKey;