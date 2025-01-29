const logout = async (req, res) => {
    if (!req.session.user_id) {
        res.status(401).send("User is not authenticated");
    } else {
        req.session.destroy();
        res.send("Success");
    }
}

export default logout;