const mongoose = require("mongoose")
const { BrandDB } = require("../Schemas/Brand.schema")
const { SupplierDb } = require("../Schemas/Supplier.schema")

module.exports.getAllSuppliers = async (req, res) => {
    try {
        const result = await SupplierDb.find({}).populate('brands') 
        res.send(result)
    } catch (error) {
        res.send(error)

    }
}
module.exports.getASupplier = async (req, res) => {
    try {
        const result = await SupplierDb.find({ _id: mongoose.Types.ObjectId })
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}
module.exports.createASupplier = async (req, res) => {
    try {
        const result = await SupplierDb.create(req.body)
        const { _id: id, brands, name } = result
        const updateBrands = await BrandDB.updateOne({ _id: brands.id }, {
            $push: {
                "suppliers": { id, name }
            }
        })
        res.send(updateBrands)
    } catch (error) {
        res.send(error)
    }
}