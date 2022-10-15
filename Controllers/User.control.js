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
            return res.json({
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

        const getConfirmationToken = await result.confirmationAccount()
        await result.save({ validateBeforeSave: false })
        if (result._id) {
            const mailData = {
                to: [result.email],
                subject: "Verify your Account",
                html: `Thank you for create account. For verify your account  <a target="_blank" href="${req.protocol}://${req.get('host')}${req.originalUrl}/confirmation/${getConfirmationToken}">Active account<a/>`
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
module.exports.accountConfirmation = async (req, res) => {
    try {
        const { token } = req.params
        if (!token) {
            return res.json({
                status: 'fail',
                error: "invalid token (no token found)"
            })
        }
        const storedToken = await userDb.findOne({ confirmationToken: token })

        if (!storedToken) {
            return res.json({
                status: 'fail',
                error: "invalid token (token didn't match)"
            })
        }

        if ((new Date(storedToken.confirmationTokenExp) < new Date())) {
            return res.json({
                status: 'fail',
                error: "expire token"
            })
        }

        storedToken.confirmationTokenExp = undefined
        storedToken.confirmationToken = undefined
        storedToken.status = 'active'
        await storedToken.save({ validateBeforeSave: false })

        res.send({
            status: 'success',
            message: 'account activated'
        })
    } catch (error) {
        return res.json({
            status: 'fail',
            error: error
        })
    }
}