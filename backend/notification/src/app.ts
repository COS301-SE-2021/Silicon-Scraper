import express from 'express';
import 'reflect-metadata';
import { connection } from './config';

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

app.get('/', (req, res) => {
    res.send('Hello there');
});

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});