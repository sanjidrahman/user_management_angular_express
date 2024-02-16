const express = require('express')
const route = express()
const userController = require('../controllers/userController.js');
const auth = require('../middleware/authMiddleware.js');

// user registration 
route.post('/register', userController.userRegister);

// user otp verification
route.post('/verify', userController.verifyOtp);

// user login
route.post('/login', userController.userLogin);

// fetch current logged user details 
route.get('/user', auth.auth, userController.getCurrUser)

module.exports = route;