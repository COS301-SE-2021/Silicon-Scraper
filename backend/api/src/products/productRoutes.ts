import express from 'express';
import {controllers} from './productController';

const router = express.Router();

// to be used for token verification for products
// router.use((req, res, next) => {
//     console.log('hello there');
//     next();
// })

router.get('/', controllers.getProducts);
router.get('/:id', controllers.getProductByID);
router.get('/search', controllers.search);

export default router;