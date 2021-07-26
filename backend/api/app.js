const express = require('express');
const productRoutes = require('./routes/product.js');
const userController = require('./users/controller/userController.js');
const watchlistController = require('./watchlist/controller/watchlistController.js')

const app = express();

app.use(express.json());
app.use('/products', productRoutes);
app.use('/users', userController);
app.use('/watchlist', watchlistController)
app.use((req, res, next) => {
    res.json({
        status: 404,
        error: "Not found",
    });
});

module.exports = app;   // for testing
