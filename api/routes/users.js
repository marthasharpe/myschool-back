const express = require('express');
const router = express.Router();

// import middleware to check authorization
const checkAuth = require('../middleware/checkAuth');

// import user controller
const UserController = require('../controllers/users');

// user signup
router.post('/signup', UserController.userSignup);

router.post('/login', UserController.userLogin);

router.delete('/:userId', checkAuth, UserController.userDelete);

module.exports = router;