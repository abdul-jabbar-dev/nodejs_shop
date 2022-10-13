const express = require('express');
const { getAllStore, createAStore,getAStore } = require('../Controllers/Store.control');
const StoreRoute = express.Router();

StoreRoute
    .get('/', getAllStore)
    .get('/:id', getAStore)
    .post('/', createAStore)

module.exports = StoreRoute