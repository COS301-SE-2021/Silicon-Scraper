import express from 'express';
import 'reflect-metadata';
import { getRepository } from 'typeorm';
import { connection } from './config';
import { User } from './entity/user';
import connectClient from './listener/listener';

const app = express();
const port = process.env.PORT || 3000;

/**
 * Use listener and wait for changes to database
 * When a change is discovered, check if any users have the product in their watchlist
 * Use broadcast to send messages to devices
 * Devices can be open sockets/connections or app can poll server to check for changes
 * Keep record of changes in array with string-based keys where index is product id
 * changes = {
 *  [key: string]: Product
 * }
 * Then to retrieve, changes[productID] = product: Product
 */

// interface test {
//     [key: string]: number
// }

/**
 * Create connection to database
 */

connection();
// start listener
connectClient();

app.get('/', async (req, res) => {
    const user = getRepository(User);
    
    res.send(await user.find());
});

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});