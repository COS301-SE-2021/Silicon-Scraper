const repo = require('./repo')
const mockData = require('../mocks/productMocks')

const getProducts = (req, res) => {
    let products = mockData;
    res.json(products);
}

const search = (req, res) => {
    res.json({status: 200});
}

const getProductByID = (req, res) => {
    let id = req.params.id;
    let product = {};
    mockData.forEach((x) => {
        if (x.id == parseInt(id.toString())) {
            product = x;
        }
    });
    res.json(product);
}

module.exports = {
    getProducts,
    search,
    getProductByID
}