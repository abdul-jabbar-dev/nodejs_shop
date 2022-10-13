const express = require('express');
const mongoose = require('mongoose');
const BrandRoute = require('./Routes/Brand.route');
const CategoryRoute = require('./Routes/Category.route');
const ProductRoute = require('./Routes/Product.route');
const StockRoute = require('./Routes/Stock.route');
const StoreRoute = require('./Routes/Store.route');
const SupplierRoute = require('./Routes/Supplier.route');
const UserRoute = require('./Routes/User.route');
const app = express();
const PORT = 4000;

mongoose.connect('mongodb://localhost:27017/my_store').then(res => console.log('data connect'))

app.use(express.json())

app.use('/product', ProductRoute)
app.use('/brand', BrandRoute)
app.use('/store', StoreRoute)
app.use('/category', CategoryRoute)
app.use('/stock', StockRoute)
app.use('/supplier', SupplierRoute)
app.use('/user', UserRoute)



app.get('/', (req, res) => {
    res.send('running')
})


app.listen(PORT, (errr) => { console.log('port is running') })