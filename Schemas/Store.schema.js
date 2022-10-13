const mongoose = require('mongoose')
const { Schema } = mongoose
const StoreSchema = new Schema({
    name: {
        type: String,
        required: true,
        uniq: true,
        trim: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['Activate', 'Deactivate']
    },
    manager: {
        id: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        name: {
            type: String,
            uniq: true,
            trim: true
        },
        contactNumber: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updateAt: {
        type: Date,
    }
})
const StoreDb = mongoose.model('store', StoreSchema)
module.exports.StoreDb = StoreDb