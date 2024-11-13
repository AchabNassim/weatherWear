import fetchUserHistory from '../model/fetchUserHistory.js'

const retrieveHistory = (req, res) => {
    const userId = req.session.user_id;
    if (!userId) {
        res.status(401).send("Authentication required");
    } else {
        const data = fetchUserHistory(userId);
        console.log(data[0]);
        res.send("success");
    }
}

export default retrieveHistory;