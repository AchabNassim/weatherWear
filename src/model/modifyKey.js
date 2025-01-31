import client from "../config/dbConnection.js";

const modifyKey = async (userId, newKey) => {
    console.log(userId, newKey);
    const query = `UPDATE "api_key" SET key='${newKey}' WHERE user_id='${userId}'`
    const result = client.query(query);
};

export default modifyKey;