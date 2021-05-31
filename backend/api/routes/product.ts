import {Router} from 'express';
import mockData from '../mocks/productMocks.js';
const routes = Router();

interface Product {
    id: number,
    brand: string,
    model: string,
    retailer: string,
    price: number,
    description: string,
    img: string,
    url: string,
    availability: number
}

routes.get('/getProducts', (req, res) => {
    let products: Product[] = mockData;
    res.json(products);
});

routes.get('/getProductByID', (req, res) => {
    res.json();
});

routes.get('/search', (req, res) => {
    res.json();
});

export default routes;