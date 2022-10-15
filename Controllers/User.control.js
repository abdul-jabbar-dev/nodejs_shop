const { default: mongoose } = require("mongoose")
const userDb = require("../Schemas/User.schema")
const bcrypt = require('bcrypt')
const generateToken = require('../Utils/token')
const { sendMailWithGmail } = require("../Utils/mail")
module.exports.getAllUsers = async (req, res) => {
    try {
        const result = await userDb.find({})
        res.send(result)
    } catch (error) {
        res.json({
            status: "fail",
            error
        })
    }
}
module.exports.getAUser = async (req, res) => {
    try {
        const result = await userDb.find({ _id: mongoose.Types.ObjectId(req.params.id) })
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}
module.exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body

        //provide email password
        if (!email || !password) {
            return res.json({
                status: 'fail',
                error: "Provide email and password"
            })

        }
        //exist user by email
        const existUser = await userDb.findOne({ email: email })

        if (!existUser) {
            return res.json({
                status: 'fail',
                error: "User doesn't exist! create a user"
            })

        }

        //match password
        const matchPassword = bcrypt.compareSync(password, existUser.password)
        if (!matchPassword) {
            return res.json({
                status: 'fail',
                error: "your password doesn't match"
            })
        }
        //chk status
        if (existUser.status != "active") {
            return res.json({
                status: 'fail',
                error: "your account not active"
            })
        }
        //generate token
        const token = generateToken(existUser)

        existUser.confirmPassword = undefined
        existUser.password = undefined


        res.send({
            status: "success",
            deta: {
                existUser,
                token
            }
        })
    } catch (error) {
        res.json({
            error: "fail",
            massage: error
        })
    }
}
module.exports.signUp = async (req, res) => {
    try {
        const data = req.body
        if (!data.email || !data.password) {
            returnres.json({
                error: "fail",
                massage: "email and password are required"
            })
        }
        if (data.password !== data.confirmPassword) {
            return res.json({
                error: "fail",
                massage: "Password didn't match"
            })
        }
        if (!data.role) {
            return res.json({
                error: "fail",
                massage: "Roll is missing"
            })
        }
        const result = await userDb.create(req.body)
        console.log(result)
        if (result._id) {
            const mailData = {
                to: [result.email],
                subject: "Verify your Account",
                text: "Thank you"
            }
            const sendMail = await sendMailWithGmail(mailData)
            res.send(sendMail)
        }
    } catch (error) {
        if (error?.kePattern?.email != 0) {
            return res.json({
                status: 'fail',
                error: "This user already created try to login"
            })
        } else {
            return res.json({
                status: 'fail',
                error: error
            })
        }
    }
}
module.exports.getMe = async (req, res) => {
    try {

        const decodedToken = req.user
        const userInfo = await userDb.findOne({ email: decodedToken.email }).select({ password: 0, confirmPassword: 0 })
        res.send(userInfo)
    } catch (error) {
        res.send({
            status: "fail",
            error
        })
    }
}