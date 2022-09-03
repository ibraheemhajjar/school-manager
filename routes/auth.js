const express = require('express')
const router = express.Router();
const authControllers = require('../controllers/auth')

// auth routes
router.get('/login', authControllers.getLogin);
router.post('/login', authControllers.postLogin);
router.get('/signup', authControllers.getSignup);
router.post('/signup', authControllers.postSignup);
router.get('/signout', authControllers.getSignout);

module.exports = router;
