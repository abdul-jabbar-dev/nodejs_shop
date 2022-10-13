const { BrandDB } = require("../Schemas/Brand.schema")


module.exports.getAllBrands = async (req, res) => {
    try {
        const result = await BrandDB.find({}).populate('suppliers')
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}
module.exports.getABrands = async (req, res) => {
    try {
        const result = await BrandDB.find({ _id: req.params.id })
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}
module.exports.createABrand = async (req, res) => {
    try {
        const result = await BrandDB.create(req.body)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}