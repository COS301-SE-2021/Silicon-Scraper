const express = require('express');
const mockData = require('../mocks/productMocks');
const controller = require('../products/productController');

const router =  express.Router();

router.get('/getProducts', controller.getProducts);
router.get('/getProductByID/:id', controller.getProductByID);
router.get('/search', controller.search);

module.exports = router;
