const express = require('express');
const productRoutes = require('./routes/product.js');
const userRoutes = require('./routes/userRoutes.js');

const app = express();

app.use(express.json());
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        error: 'Not found'
    });
});

module.exports = app;   // for testing
