const { BrandDB } = require("../Schemas/Brand.schema")
const { ProductDB } = require("../Schemas/Product.schema")

module.exports.getAllProducts = async (req, res) => {
    try {
        const result = await ProductDB.find({})
        res.send(result)
    } catch (error) {
        res.send(error.message)
    }
}

module.exports.getAProducts = async (req, res) => {
    try {
        const result = await ProductDB.find({ _id: req.params.id })
        res.send(result)
    } catch (error) {
        res.send(error.message)
    }
}
module.exports.createAProduct = async (req, res) => {
    try {
        const result = await ProductDB.create(req.body)
        const { _id: productId, brand } = result
        const newResult = await BrandDB.updateOne({ _id: brand.id }, { $push: { products: productId } })

        res.send(newResult)
    } catch (error) {
        res.send(error.message)
    }
}
module.exports.createProductImage = async (req, res) => {
    try {
    } catch (error) {
        res.send(error.message)
    }
}