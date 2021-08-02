import express from 'express';

const app = express();

app.use(express.json());
app.use('/products',);
app.use('/users',);
app.use('/watchlist',);
app.use((req, res, next) => {
    res.json({
        status: 404,
        error: 'Not Found'
    });
});

export default app;