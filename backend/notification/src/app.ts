import express from 'express';
import 'reflect-metadata';
import { connection } from './config';
import connectClient from './listener/listener';
import { subscribe } from './controller/subscribe.controller';

const app = express();
const port = process.env.PORT || 3000;

/**
 * Use listener and wait for changes to database
 * When a change is discovered, check if any users have the product in their watchlist
 * Use broadcast to send messages to devices

/**
 * Create connection to database for typeorm
 */
connection();

/**
 * Start database listener
 */
connectClient();

app.get('/', async (req, res) => {
    res.send('Hello there');
});

app.post('/subscribe', subscribe);

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});