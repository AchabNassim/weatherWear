import bcrypt from "bcrypt";
import { fetchUser } from "../queries/userQueries.js";

const login = async (req, res, next) => {
        const {email, password} = req.body;
        const user = await fetchUser(email);
        if (!user || !user.id) {
            res.status(401).send("User doesn't exist");
            return ;
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            res.locals.user = {
                id: user.id,
                name: user.name
            }
            next();

        } else {
            res.status(401).send("User password is incorrect");
        }    
}

export default login;