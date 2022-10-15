
const { StockDb } = require("../Schemas/Stock.schema")

module.exports.getAllStockList = async (req, res) => {
    try {
        const filter = req.query
        const field = filter?.fields?.split(',')?.join(' ')
        const sort = filter?.sort?.split(',')?.join(' ')
        let page = (filter?.page) * 1 || 1
        let limit = (filter?.limit) * 1 || 5
        const result = await StockDb.find({}, field).sort(sort).skip((page - 1) * limit).limit(limit)
        res.send(result)

    } catch (error) {
        res.send(error)
    }
}
module.exports.getAStock = async (req, res) => {
    try {
        const result = await StockDb.find({ _id: req.params.id })
            .populate('category.categoryId')
            .populate('brand.brandId')
            .populate('suppliedBy.supplierId')
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}
module.exports.getStoreStock = async (req, res) => {
    try {
        const destination = req.params.destination
        const result = await StockDb.aggregate([
            {
                $lookup: {
                    from: 'brands',
                    let: { name: 'name' },

                    foreignField: 'name',
                    as: 'OrdersData'
                }
            }
        ])
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}
module.exports.createAStock = async (req, res) => {
    try {
        const result = await StockDb.create(req.body)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}