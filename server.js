import express from 'express'
import cors from 'cors'
import session from 'express-session';
import bodyParser from 'body-parser';
import router from './routes/router.js';

const app = express();

app.use(cors({
    origin: "*"
}));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "some secret",
}))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(router);

app.listen(3000, () => {
    console.log("App is listening on http://localhost:3000 \n");
})