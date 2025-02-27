const hasToken = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            res.status(403);
            res.send("User already has an access token, please remove it before proceeding.");
            return ;
        }
    }
    next();
};

export default hasToken;