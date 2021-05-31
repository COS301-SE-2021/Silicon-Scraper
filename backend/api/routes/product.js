import { Router } from 'express';
const routes = Router();
routes.get('/getProducts', (req, res) => {
    let products = [
        {
            brand: "String",
            model: "String",
            retailer: "String",
            price: 0,
            description: "String",
            img: "String",
            url: "String",
            availability: 0
        }
    ];
    res.json(products);
});
routes.get('/getProductByID', (req, res) => {
    res.json();
});
routes.get('/search', (req, res) => {
    res.json();
});
export default routes;
