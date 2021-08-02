import pool from '../database';
/** 
 * Fetch data from database
 * @param {String} sqlQuery - Query used to fetch data from db
 */
async function fetchData(sqlQuery: string) {
    const client = await pool.connect();
    try {
        const data = await client.query(sqlQuery);
        return data.rows;
    } catch(error) {
        return [];  
    } finally {
        client.release();
    }
}

export default fetchData;
