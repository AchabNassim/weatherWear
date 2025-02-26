import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import router from './routes/router.js';
import storeSuggestions from './helpers/storeSuggestions.js';

storeSuggestions();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: "*"
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(router);

app.listen(PORT);