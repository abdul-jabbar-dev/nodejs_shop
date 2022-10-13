const mongooes = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const usersSchema = new mongooes.Schema({
    email: {
        type: String,
        validate: [validator.isEmail, 'Provide a valid Email'],
        trim: true,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minNumbers: 1
                })
            },
            message: "Password {VALUE} is not strong"
        }
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value === this.password
            },
            message: "Password didn't match!"
        }
    },
    firstName: String,
    lastName: String,
    number: String,
    shippingDetails: String,
    imageURL: String,
    role: {
        type: String,
        enum: ['buyer', 'seller', 'manager', 'admin'],
        default: 'buyer'
    },
    statue: {
        type: String,
        enum: ['active', 'in-active', 'blocked'],
        default: 'active'
    },
    createdAt: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

}, {
    timestamps: true
})

// usersSchema.method.matchPassword = (CP) => {
    
// }


usersSchema.pre('save', function (next) {
    const pass = this.password
    this.password = bcrypt.hashSync(pass, 0)
    next()

})
const userDb = mongooes.model('users', usersSchema)
module.exports = userDb