const express = require('express');
const mockData = require('../mocks/productMocks');

const router =  express.Router();

router.get('/getProducts', (req, res) => {
    let products = mockData;
    res.json(products);
});

router.get('/getProductByID/:id', (req, res) => {
    let id = req.params.id;
    let product = {};
    mockData.forEach((x) => {
        if (x.id == parseInt(id.toString())) {
            product = x;
        }
    });
    res.json(product);
});

router.get('/search', (req, res) => {
    let query = req.query.key;
    let products = [];
    mockData.forEach((x) => {
        if (x.brand.toLowerCase() === (query.toString().toLowerCase())) {
            products.push(x);
        }
        else if (x.model.toLowerCase().includes(query.toString().toLowerCase())) {
            products.push(x);
        }
    });
    res.json(products);
});

module.exports = router;
