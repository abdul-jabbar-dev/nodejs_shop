const mongoose = require('mongoose')
const { Schema } = mongoose

const BrandSchema = new Schema({
    name: {
        type: String,
        uniq: true,
        trim: true
    },
    description: {
        type: String
    },
    email: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        enum: ['Activate', 'Deactivate']
    },
    products: [{
        type: mongoose.Types.ObjectId,
        ref: "product"
    }],
    suppliers: [{
        name: String,
        id: { type: mongoose.Types.ObjectId, ref: 'suppliers' }
    }],
    createdAt: {
        type: Date,
        default: new Date()
    },
    updateAt: {
        type: Date,
    }


}, { timestamps: true })
const BrandDB = mongoose.model('brands', BrandSchema)
module.exports.BrandDB = BrandDB