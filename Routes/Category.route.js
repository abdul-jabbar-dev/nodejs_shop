const express = require('express')
const { getAllCategory, createACategory, getACategory } = require('../Controllers/Category.control')
const CategoryRoute = express.Router()


CategoryRoute
    .get('/', getAllCategory)
    .get('/:id', getACategory)
    .post('/', createACategory)

module.exports = CategoryRoute