const mongoose = require('mongoose')
const StockSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'ProductDB'
    },
    name: {
        type: String, 
        uniq: true,
        trim: true
    },
    description: {
        type: String
    },
    unit: {
        type: String,
        enum: ['kg', 'liter', 'pound', 'pics', 'pack', 'gram', 'bag', 'box'],
 
        default: 'kg'
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    category: {
        name: String,
        categoryId: {
            type: mongoose.Types.ObjectId,
            ref: 'category'
        }
    },
    status: {
        type: String,
        enum: ['In-stock', 'Out-of-stock'],
        default: 'In-stock'
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: Date,
    brand: {
        name: {
            type: String,
            uniq: true,
            trim: true
        },
        brandId: {
            type: mongoose.Types.ObjectId,
            ref: 'brands',
        }
    },
    store: {
        name: {
            type: String,
            trim: true
        },
        id: {
            type: mongoose.Types.ObjectId,
            ref: "stores",
        }
    },
    suppliedBy: {
        name: {
            type: String,
            trim: true
        },
        supplierId: {
            type: mongoose.Types.ObjectId,
            ref: "supplier",
        }
    }
})
const StockDb = mongoose.model('stock', StockSchema)
module.exports.StockDb = StockDb