import express from 'express';
import productRoutes from './routes/product';
import userController from './users/controller/userController';
import watchlistController from './watchlist/controller/watchlistController';

const app = express();

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