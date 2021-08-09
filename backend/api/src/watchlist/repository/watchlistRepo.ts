import pool from '../../database';

/**
 * This function handles the function of adding a cpu product to a user's watchlist
 * to the database. If the insertion was successful then it return true. If an error
 * occurred it is either: an error occurred during insertion or a cpu with that product
 * id is already within the person's CPU watchlist.
 * 
 * 
 * @param {string} userID id of the user of which we want to add a product to the watchlist for
 * @param {string} cpuID id of the cpu product to be added to the watchlist
 * @returns {boolean} determining whether the query was successful (true) or not (false)
 */

const addCPUToWatchlist = async (userID, cpuID) => {
    const client = await pool.connect();

    try {
        const data = await client.query(`INSERT INTO watchlist_cpu VALUES ('${userID.toString()}', '${cpuID}')`);
        return true;
    } catch(error) {
        return false;
    } finally {
        client.release();
    }        
}

/**
 * This function handles the function of adding a cpu product to a user's watchlist
 * to the database. If the insertion was successful then it return true. If an error
 * occurred it is either: an error occurred during insertion or a gpu with that product
 * id is already within the person's GPU watchlist.
 * 
 * 
 * @param {string} userID id of the user of which we want to add a product to the watchlist for
 * @param {string} gpuID id of the gpu product to be added to the watchlist
 * @returns {boolean} determining whether the query was successful (true) or not (false)
 */

const addGPUToWatchlist = async (userID, gpuID) => {
    const client = await pool.connect();

    try {
        const data = await client.query(`INSERT INTO watchlist_gpu VALUES ('${userID.toString()}', '${gpuID}')`);
        return true;
    } catch(error) {
        return false;
    } finally {
        client.release();
    } 
}

/**
 * This function handles the operation of getting the products from a user's watchlist
 * and returning them. If the products from the user's wishlist were retrieved successfully
 * then an array with all the products will be returned. If the process was not successful then
 * an empty array will be returned.
 * 
 * @param {string} userID id of the user
 * @returns {Array} of the cpus & gpus from the user's watchlist
 */

const getWatchlist = async (userID) => {
    const client = await pool.connect();

    try {
        let query = `SELECT id, image, brand, model, price, description, availability, retailer, link, type FROM (watchlist_cpu RIGHT JOIN cpus ON watchlist_cpu.product_id = cpus.id) WHERE user_id = '${userID}'`;
        let data = await client.query(query);
        const cpuList = data.rows;

        query = `SELECT id, image, brand, model, price, description, availability, retailer, link, type FROM (watchlist_gpu RIGHT JOIN gpus ON watchlist_gpu.product_id = gpus.id) WHERE user_id = '${userID}'`;
        data = await client.query(query);
        const gpuList = data.rows;

        cpuList.push(...gpuList);
        return cpuList;
    } catch(error) {
        return [];
    } finally {
        client.release();
    } 
}

/**
 * This funtion handles the process of removing an item from a user's watchlist.
 * 
 * @param {string} userID id of the user
 * @param {string} productID id of the product within the watchlist
 * @param {string} productType indicates whether the product is a CPU/GPU
 * @returns {boolean} value indicating if the process was successful (true) or not (false)
 */

const removeProduct = async (userID, productID, productType) => {
    const client = await pool.connect();

    try {
        let query = '';
        switch(productType) {
            case 'GPU':
                query = `DELETE FROM watchlist_gpu WHERE user_id = '${userID}' AND product_id = '${productID}'`;
                break;
            case 'CPU':
                query = `DELETE FROM watchlist_cpu WHERE user_id = '${userID}' AND product_id = '${productID}'`;
                break;
            default:
                break;
        }
        const data = await client.query(query);
        return true;
    } catch(error) {
        return false;
    } finally {
        client.release();
    } 
}

const WatchlistRepo = {
    addCPUToWatchlist,
    addGPUToWatchlist,
    getWatchlist,
    removeProduct
};

export default WatchlistRepo;