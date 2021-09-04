import express from 'express';
import {controllers} from './productController';

const router = express.Router();

// router.use((req, res, next) => {
//     console.log('hello there');
//     next();
// })

router.get('/', controllers.getProducts);
router.get('/search', controllers.search);
router.get('/id/:id', controllers.getProductByID);
router.get('/retailer', controllers.getRetailers);

export default router;