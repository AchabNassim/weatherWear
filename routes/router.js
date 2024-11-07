import express from 'express'
import register from '../controllers/register.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Available routes are available at http://api-routes.com here");
});

router.post('/register', register);

export default router;