const express = require('express')
const { getAllSuppliers, getASupplier, createASupplier } = require('../Controllers/Supplier.control')
const SupplierRoute = express.Router()

SupplierRoute
    .get('/', getAllSuppliers)
    .get('/:id', getASupplier)
    .post('/', createASupplier)
module.exports = SupplierRoute