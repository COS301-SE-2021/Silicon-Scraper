import express from 'express';
import routes from './routes/product.js';
import userRoutes from './routes/userRoutes.js';
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/product', routes);
app.use('/user', userRoutes);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
