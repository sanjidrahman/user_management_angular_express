const express = require('express')
const route = express()
const userController = require('../controllers/userController.js')

route.post('/register', userController.userRegister)

module.exports = route