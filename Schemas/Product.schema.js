const { default: mongoose } = require("mongoose");
const { Schema } = mongoose

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        uniq: true,
        trim: true
    },
    description: {
        type: String
    },
    imageURLs: {
        type: String
    },
    unit: {
        type: String,
        enum: ['kg', 'liter', 'pound', 'pics', 'pack', 'gram', 'bag', 'box'],
        require: true,
        default: 'kg'
    },
    category: String,
    brand: {
        name: {
            type: String,
            required: true,
            uniq: true,
            trim: true
        },
        id: {
            type: mongoose.Types.ObjectId,
            ref: "brand",
        }
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: Date
},
    { timestamps: true })

const ProductDB = mongoose.model('product', ProductSchema)
module.exports.ProductDB = ProductDB