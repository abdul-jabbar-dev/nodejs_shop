const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = (userInfo) => {
    const payload = {
        email: userInfo.email,
        role: userInfo.role,
        _id: userInfo._id
    }
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '20mins' })
    return token
}