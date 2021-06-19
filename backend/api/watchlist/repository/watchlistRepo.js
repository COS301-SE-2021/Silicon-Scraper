const configs = require('../../config')
const {v4 : uuidv4} = require('uuid')
const pgp = require('pg-promise')({
    capSQL: true
})

const client = {
    host: configs.host,
    user: configs.user,
    database: configs.name,
    password: configs.pw,
    port: configs.port
}

const db = pgp(
    client
)

/**
 * 
 * @param {object} dbase an object to a database
 * @returns {object} of functions for crud  operations to be performed for the wishlist
 *                   service
 */

module.exports = (dbase = db) => {

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

    const addCPUToWatchlist = async(userID, cpuID) => {
        const cs = new pgp.helpers.ColumnSet(['user_id', 'product_id'], {table: 'watchlist_cpu'})
        const list = {
            user_id: userID,
            product_id: cpuID
        }
        const query = pgp.helpers.insert(list, cs)
        return await dbase.none(query)
        .then(res => {
            return true;
        })
        .catch(err => {
            return false;
        })
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

    const addGPUToWatchlist = async(userID, gpuID) => {
        const cs = new pgp.helpers.ColumnSet(['user_id', 'product_id'], {table: 'watchlist_gpu'})
        const list = {
            user_id: userID,
            product_id: gpuID
        }
        const query = pgp.helpers.insert(list, cs)
        return await dbase.none(query)
        .then(res => {
            return true;
        })
        .catch(err => {
            return false;
        })
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

    const getWatchlist = async(userID) => {
        const where = pgp.as.format('WHERE user_id = $1', userID);
        const cpuList = await dbase.manyOrNone("SELECT id, image, brand, model, price, description, availability, retailer, link FROM watchlist_cpu RIGHT JOIN cpus ON watchlist_cpu.product_id = cpus.id $1:raw", where)
        .then(cpus => {
            return cpus;
        })
        .catch(err => {
            return [];
        })

        const gpuList = await dbase.manyOrNone("SELECT id, image, brand, model, price, description, availability, retailer, link FROM watchlist_gpu RIGHT JOIN gpus ON watchlist_gpu.product_id = gpus.id $1:raw", where)
        .then(gpus => {
            return gpus;
        })
        .catch(err => {
            return [];
        })

        cpuList.push(...gpuList)
        return cpuList;
    }

    /**
     * This funtion handles the process of removing an item from a user's watchlist.
     * 
     * @param {string} userID id of the user
     * @param {string} productID id of the product within the watchlist
     * @param {string} productType indicates whether the product is a CPU/GPU
     * @returns {boolean} value indicating if the process was successful (true) or not (false)
     */

    const removeProduct = async(userID, productID, productType) => {
        console.log(userID + " " + productID + " " + productType)
        const where = pgp.as.format('WHERE user_id = $1 AND product_id = $2', [userID, productID]);
        let query;
        if (productType == "CPU")
            query = "DELETE FROM watchlist_cpu";
        else
            query = "DELETE FROM watchlist_gpu";
        return await dbase.none(query + " $1:raw", where)
        .then(res => {
            return true;
        })
        .catch(err=> {
            return false;
        })
    }


    return {
        addCPUToWatchlist,
        addGPUToWatchlist,
        getWatchlist,
        removeProduct
    }
}