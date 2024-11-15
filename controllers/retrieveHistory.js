import fetchUserHistory from '../model/fetchUserHistory.js'

const retrieveHistory = async (req, res) => {
    const userId = req.session.user_id;
    if (!userId) {
        res.status(401).send("Authentication required");
    } else {
        const data = await fetchUserHistory(userId);
        res.send(JSON.stringify(data));
    }
}

export default retrieveHistory;