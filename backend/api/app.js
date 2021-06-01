const express = require('express');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/product', productRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = app;   // for testing
