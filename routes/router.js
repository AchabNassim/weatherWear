import express from 'express'
import register from '../controllers/register.js';
import login from '../controllers/login.js';
import logout from '../controllers/logout.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Available routes are available at http://api-routes.com here");
});

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

export default router;