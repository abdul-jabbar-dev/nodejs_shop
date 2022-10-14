const jwt = require('jsonwebtoken')
require('dotenv').config()
exports.generateToken = (userInfo) => {
    const payload = {
        email: userInfo.email,
        role: userInfo.role
    }
    console.log(process.env.TOKEN_SECRET)
    const token = jwt.sign(payload,process.env.TOKEN_SECRET,{expiresIn:'20'})
    return token
}