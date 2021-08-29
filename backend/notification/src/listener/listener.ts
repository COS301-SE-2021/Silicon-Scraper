import pg from 'pg';
import Broadcast from '../broadcast/broadcast';
import { CPU } from '../entity/cpu';
import { GPU } from '../entity/gpu';

/**
 * Notification received by server from database including the updated or newly inserted product
 */
interface notification {
    processId: number;
    channel: string;
    payload?: string;
}

/**
 * Class used to listen for notifications from the database
 */
export default class Listener {
    constructor() {
        const client = new pg.Client({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PW,
            database: process.env.DB_NAME
        });

        client.connect();
        client.query('LISTEN table_modified');
        
        const broadcaster = new Broadcast();

        client.on('notification', (msg: notification) => {
            console.log(msg.payload);
            broadcaster.broadcast(msg.payload);
        });
    
        client.on('error', (err: Error) => {
            console.error('client error: ', err.stack);
        });
    
        client.on('end', () => {
            console.log('Client disconnected');
            // reconnect client after disconnecting
            client.connect();
            client.query('LISTEN table_modified');
        });
    }
}