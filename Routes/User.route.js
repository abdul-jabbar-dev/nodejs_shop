const express = require('express')
const { getAllUsers, getAUser, signUp, signin, getMe } = require('../Controllers/User.control')
const tokenVerify = require('../middlewares/tokenVerify')
const authorization = require('../Utils/authorization')
const UserRoute = express.Router()

UserRoute
    .get('/', tokenVerify, authorization( 'manager', 'admin'), getAllUsers)
    .get('/me', tokenVerify, getMe)
    .get('/:id', getAUser)
    .post('/signup', signUp)
    .post('/signin', signin)

module.exports = UserRoute
