import client from "../config/dbConnection.js";

const invalidateToken = async (token) => {
    const query = `UPDATE "refresh_token" SET used_status = TRUE WHERE token = '${token}'`;
    const result = client.query(query);
}

export default invalidateToken;