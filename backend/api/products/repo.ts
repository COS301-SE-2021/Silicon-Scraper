import config from '../config';
import { Pool } from 'pg';

const pool = new Pool({
    user: config.user,
    host: config.host,
    database: config.name,
    password: config.pw,
    port: config.port
});

/** 
 * Fetch data from database
 * @param {String} sqlQuery - Query used to fetch data from db
 */
async function fetchData(sqlQuery: string) {
    try {
        const data = await pool.query(sqlQuery);
        return data.rows;
    } catch(error) {
        return [];
    }
}

export = {
    pool,
    fetchData
}
