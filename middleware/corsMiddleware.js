const corsMiddleware = (req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `${req.socket.remoteAddress}`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
}

export default corsMiddleware;