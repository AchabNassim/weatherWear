import client from "../config/dbConnection.js";

const modifyKey = async (userId, newKey) => {
    const query = `UPDATE "api_key" SET key='${newKey}' WHERE user_id=${userId}`
    const result = await client.query(query);
    return (result)
};

export default modifyKey;