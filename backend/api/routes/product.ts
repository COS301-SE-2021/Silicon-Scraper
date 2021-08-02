import express from 'express';
import {controllers} from '../products/productController';

const router = express.Router();

// to be used for token verification for products
// router.use((req, res, next) => {
//     console.log('hello there');
//     next();
// })

router.get('/getProducts', controllers.getProducts);
router.get('/getProductByID/:id', controllers.getProductByID);
router.get('/search', controllers.search);

export default router;