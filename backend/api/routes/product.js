import { Router } from 'express';
import mockData from '../mocks/productMocks.js';
const routes = Router();
routes.get('/getProducts', (req, res) => {
    let products = mockData;
    res.json(products);
});
routes.get('/getProductByID', (req, res) => {
    res.json();
});
routes.get('/search', (req, res) => {
    res.json();
});
export default routes;
