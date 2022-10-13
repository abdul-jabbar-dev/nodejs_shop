const { default: mongoose } = require("mongoose")
const userDb = require("../Schemas/User.schema")

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
module.exports.signUp = async (req, res) => {
    try {
        const data = req.body
        if (!data.email && !data.password) {
            res.json({
                error: "fail",
                massage: "email and password are required"
            })
        }
        if (!data.role) {
            res.json({
                error: "fail",
                massage: "Roll is missing"
            })
        }
        if (!userDb.matchPassword(data.confirmPassword)) {

        }
        const result = await userDb.create(req.body)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}