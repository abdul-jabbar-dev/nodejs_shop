const { default: mongoose } = require("mongoose");
const { Schema } = mongoose

const CategorySchema = new Schema({
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
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: Date
},
    { timestamps: true })

const CategoryDB = mongoose.model('category', CategorySchema)
module.exports.CategoryDB = CategoryDB