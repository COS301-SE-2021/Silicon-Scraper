import express from 'express';
import 'reflect-metadata';
import { connection } from './config';

const connect = async () => {
    await connection();
}

connect();

const app = express();

console.log('con')

import productRoutes from './products/productRoutes';
import userController from './users/controller/userController';
import watchlistController from './watchlist/controller/watchlistController';

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