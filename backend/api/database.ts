// import config from './config';
import { Pool } from 'pg';

// create pool for connection

const pool = new Pool({
    // user: config.user,
    // host: config.host,
    // database: config.name,
    // password: config.pw,
    // port: config.port
});

export default pool;