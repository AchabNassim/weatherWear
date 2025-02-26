import modifyKey from "../model/modifyKey.js";
import fetchKey from "../model/fetchKey.js";
import { v4 as uuidv4 } from 'uuid';

const updateKey = async (req, res) => {
    const id = res.locals.user.id;
    const newKey = uuidv4();
    const record = await fetchKey(newKey);
    if (record) {
        res.status(500).send("Server internal error, please try again");
    } else {
        modifyKey(id, newKey);
        res.send(`Generated key successfully "${newKey}"`);
    }
}

export default updateKey;