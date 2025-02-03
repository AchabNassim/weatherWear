import { v4 as uuidv4 } from 'uuid';
import insertKey from "../model/insertKey.js";
import fetchKeyById from '../model/fetchKeyById.js';
import fetchKey from '../model/fetchKey.js';

const generateKey = async (req, res) => {
    const id = res.locals.user.id;
    const record = await fetchKeyById(id);
    if (!record) {
        const key = uuidv4();
        const keyExists = await fetchKey(key);
        if (keyExists) {
            res.status(500).send("Server internal error, please try again");
        } else {
            insertKey(id, key);
            res.send(`Generated key successfully "${key}"`);
        }
    } else {
        res.status(403).send("User already has a key");
    }
}

export default generateKey;