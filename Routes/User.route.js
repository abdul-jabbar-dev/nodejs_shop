const express = require('express')
const { getAllUsers, getAUser, signUp,signin } = require('../Controllers/User.control')
const UserRoute = express.Router()

UserRoute
    .get('/', getAllUsers)
    .get('/:id', getAUser)
    .post('/signup', signUp)
    .post('/signin', signin)

module.exports = UserRoute
