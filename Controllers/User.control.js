const { default: mongoose } = require("mongoose")
const userDb = require("../Schemas/User.schema")
const bcrypt = require('bcrypt')
const { generateToken } = require("../Utils/token")
module.exports.getAllUsers = async (req, res) => {
    try {
        const result = await userDb.find({})
        res.send(result)
    } catch (error) {
        res.send(error)
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
        res.send(error)
    }
}
module.exports.signUp = async (req, res) => {
    try {
        const data = req.body
        if (!data.email || !data.password) {
            res.json({
                error: "fail",
                massage: "email and password are required"
            })
        }
        if (data.password !== data.confirmPassword) {
            res.json({
                error: "fail",
                massage: "Password didn't match"
            })
        }
        if (!data.role) {
            res.json({
                error: "fail",
                massage: "Roll is missing"
            })
        }
        const result = await userDb.create(req.body)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}