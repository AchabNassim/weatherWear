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

router.use('/', express.static('../views/router.html'));

// authentication routes
router.post('/register', register); // registers, creates a session, requires name, email and a password with an uppercase letter, a number and a special character
router.post('/login', login); // login, creates session, requires email and password
router.get('/logout', logout); // destroys session

// key management routes
router.get('/generate_key', generateKey); // generates api key, requires user to be authenticated
router.get('/get_key', retrieveKeyById); // retrieves api key info with user id, requires user to be authenticated
router.post('/get_key', retrieveKey); // retrieves api key info with the key itself, requires key in request
router.get('/update_key', updateKey); // generates a new key and updates the old one with the newly created one

// api management routes
router.post('/service', getSuggestion); // get clothing categories suggestions based on the weather on the user, requires api key and a city in the req body, returns an array of suggestions, the first object is the main suggestions, the second suggestions object is only added if there is rain.
router.get('/user_history', retrieveHistory); // returns the history of api calls of the user, requires the user to be authenticated

export default router;