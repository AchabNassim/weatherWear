import bcrypt from "bcrypt";
import fetchUser from "../model/fetchUser.js";

const login = async (req, res) => {
    if (req.session.user_id) {
        res.status(200).send("User already authenticated");
        return ;
    } else {
        const {email, password} = req.body;
        const user = await fetchUser(email);
        if (!user || !user.id) {
            res.status(401).send("User doesn't exist");
            return ;
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.user_id = user.id;
            res.send("User logged in successfully");
        } else {
            res.status(401).send("User password is incorrect");
        }    
    }
}

export default login;