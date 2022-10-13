const { CategoryDB } = require("../Schemas/Category.schema")

module.exports.getAllCategory = async (req, res) => {
    try {
        const result = await CategoryDB.find({})
        res.send(result)
    } catch (error) {
        res.send(error.message)
    }
}
module.exports.getACategory = async (req, res) => {
    try {
        const result = await CategoryDB.find({ _id: req.params.id })
        res.send(result)
    } catch (error) {
        res.send(error.message)
    }
}

module.exports.createACategory = async (req, res) => {
    try {
        console.log(req.body)
        const result = await CategoryDB.create(req.body)
        res.send(result)
    } catch (error) {
        res.send(error.message)
    }
}