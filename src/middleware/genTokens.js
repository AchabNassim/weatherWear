import {genAccessToken, genRefreshToken} from "../helpers/generateToken.js"

const generateTokens = (user) => {
    const accessToken = genAccessToken(user);
    const refreshToken = genRefreshToken(user);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    };
}

const sendTokens = (req, res) => {
    const tokens = generateTokens(res.locals.user);
    res.json(tokens);
};

export default sendTokens;