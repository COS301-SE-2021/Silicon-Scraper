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
    let query = req.query.id;
    console.log(query);
    let product: Product = {
        id: 0,
        brand: "",
        model: "",
        retailer: "",
        price: 0,
        description: "",
        img: "",
        url: "",
        availability: 0
    };
    mockData.forEach((x) => {
        if(x.id == parseInt(query.toString())) {
            product = x;
        }
    })
    res.json(product);
});

routes.get('/search', (req, res) => {
    let query = req.query.key;
    let products: Product[] = [];

    mockData.forEach((x) => {
        if(x.brand.toLowerCase() === (query.toString().toLowerCase())) {
            products.push(x);
        } 
        else if(x.model.toLowerCase().includes(query.toString().toLowerCase())) {
            products.push(x);
        }
    })
    res.json(products);
});

export default routes;