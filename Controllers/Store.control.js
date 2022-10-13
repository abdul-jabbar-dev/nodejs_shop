const { StoreDb } = require("../Schemas/Store.schema")

module.exports.getAllStore = async (req, res) => {
    try {
        const result = await StoreDb.find({})
        res.send(result)
    } catch (error) {
        res.send(error)
    }

}
module.exports.getAStore = async (req, res) => {
    try {
        const result = await StoreDb.find({ _id: req.params.id })
        res.send(result)
    } catch (error) {
        res.send(error)
    }

}
module.exports.createAStore = async (req, res) => {

    try {
        const result = await StoreDb.create(req.body)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}