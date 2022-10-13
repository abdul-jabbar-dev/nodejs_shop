const express = require('express')
const { getAllUsers, getAUser, signUp } = require('../Controllers/User.control')
const UserRoute = express.Router()

UserRoute
    .get('/', getAllUsers)
    .get('/:id', getAUser)
    .post('/signup', signUp)

module.exports = UserRoute
