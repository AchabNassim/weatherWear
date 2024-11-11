import client from "../config/dbConnection.js";

const decrementToken = async (key) => {
    const query = `UPDATE "api_key" SET tokens= tokens - 1 WHERE key='${key}'`;
    const result = await client.query(query);
    return (result)
};

export default decrementToken;