const express = require('express')
const { getAllProducts, createAProduct, getAProducts, createProductImage } = require('../Controllers/Product.control')
const uploder = require('../middlewares/multer.config')
const ProductRoute = express.Router()


ProductRoute
    .get('/', getAllProducts)
    .post('/images', uploder.single('file'), createProductImage)
    .get('/:id', getAProducts)
    .post('/', createAProduct)

module.exports = ProductRoute