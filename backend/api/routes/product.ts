import {Router} from 'express';
const routes = Router();

interface Product {
    brand: String,
    model: String
    retailer: String,
    price: Number,
    description: String,
    img: String,
    url: String,
    availability: Number
}

routes.get('/getProducts', (req, res) => {
    res.json();
});

routes.get('/getProductByID', (req, res) => {
    res.json();
});

routes.get('/search', (req, res) => {
    res.json();
});

export default routes;