const express = require('express')
const { getAllBrands,getABrands, createABrand } = require('../Controllers/Brand.control')
const BrandRoute = express.Router()

BrandRoute
    .get('/', getAllBrands)
    .get('/:id', getABrands)
    .post('/', createABrand)


module.exports = BrandRoute