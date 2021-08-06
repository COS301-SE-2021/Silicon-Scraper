import express from 'express';
import 'reflect-metadata';
import { connection } from './config';
import productRoutes from './products/productRoutes';
import userController from './users/controller/userController';
import watchlistController from './watchlist/controller/watchlistController';

const app = express();
connection();

app.use(express.json());
app.use('/products', productRoutes);
app.use('/users', userController);
app.use('/watchlist', watchlistController);
app.use((req, res, next) => {
    res.json({
        status: 404,
        error: 'Not Found'
    });
});

export default app;