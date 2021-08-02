import express from 'express';
import {controllers} from '../products/productController';

const router = express.Router();

router.get('/getProducts', controllers.getProducts);
router.get('/getProductByID/:id', controllers.getProductByID);
router.get('/search', controllers.search);

export default router;