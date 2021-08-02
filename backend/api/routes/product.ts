import express from 'express';
import * as controller from '../products/productController';

const router = express.Router();

router.get('/getProducts', controller.getProducts);
router.get('/getProductByID/:id', controller.getProductByID);
router.get('/search', controller.search);

export default router;