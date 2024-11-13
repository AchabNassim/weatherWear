import express from 'express'
import register from '../controllers/register.js';
import login from '../controllers/login.js';
import logout from '../controllers/logout.js';
import generateKey from '../controllers/generateKey.js';
import retrieveKeyById from '../controllers/retrieveKeyById.js'
import retrieveKey from '../controllers/retrieveKey.js'
import updateKey from '../controllers/updateKey.js'
import getSuggestion from '../controllers/getSuggestion.js';
import retrieveHistory from '../controllers/retrieveHistory.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Available routes are available at http://api-routes.com here");
});

// authentication routes
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

// key management routes
router.get('/generate_key', generateKey);
router.get('/get_key', retrieveKeyById);
router.post('/get_key', retrieveKey);
router.get('/update_key', updateKey);

// api management routes
router.post('/service', getSuggestion);
router.get('/user_history', retrieveHistory);
// fetch user call history
// fetch all user calls (for admin)

export default router;