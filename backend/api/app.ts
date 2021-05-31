import express from 'express';

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});