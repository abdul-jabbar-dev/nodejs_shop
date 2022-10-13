const mongoose = require('mongoose')
const SupplierSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        uniq: true,
        required: true
    },
    brands: {
        name: {
            type: String,
            trim: true,
            uniq: true,
        },
        id: {
            type: mongoose.Types.ObjectId,
            ref: "brands",
            required: true
        }
    },
    email: String,
    contactNumber: String,
    address: String,
    imageURL: String,
    status: { type: String, enum: ['active', 'inactive'] },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date },
}, { timestamps: true })
const SupplierDb = mongoose.model('supplier', SupplierSchema)
module.exports.SupplierDb = SupplierDb