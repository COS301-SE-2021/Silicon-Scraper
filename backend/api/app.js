const express = require('express');
const productRoutes = require('./routes/product.js');
const userRoutes = require('./routes/userRoutes.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = app;   // for testing
