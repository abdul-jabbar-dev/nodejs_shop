const express = require('express')
const { createAStock, getAllStockList, getAStock, getStoreStock } = require('../Controllers/Stock.control')
const StockRoute = express.Router()
StockRoute
    .get('/', getAllStockList)
    .get('/store/:destination', getStoreStock)
    .get('/:id', getAStock)
    .post('/', createAStock)
module.exports = StockRoute