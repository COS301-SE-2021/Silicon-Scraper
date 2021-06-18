const configs = require('../../../config')
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
     * @param {string} userID of the user of which we want to add a product to the watchlist for
     * @param {string} cpuID 
     * @returns {boolean} determining whether the query was successful or not
     */

    const addCPUToWatchlist = async(userID, cpuID) => {
        console.log(userID + " " + cpuID)
        const cs = new pgp.helpers.ColumnSet(['user_id', 'product_id'], {table: 'watchlist_cpu'})
        const list = {
            user_id: userID,
            product_id: cpuID
        }
        console.log(list)
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
     * @param {string} userID of the user of which we want to add a product to the watchlist for
     * @param {string} gpuID 
     * @returns {boolean} determining whether the query was successful or not
     */

    const addGPUToWatchlist = async(userID, gpuID) => {
        console.log(userID + " " + gpuID)
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
     * and returning them. 
     * 
     * @param {string} userID 
     * @returns {object} of cpus & gpus from the user's watchlist
     */

    const getWatchlist = async(userID) => {
        const where = pgp.as.format('WHERE user_id = $1', userID);
        const cpuList = await dbase.manyOrNone("SELECT id, image, brand, model, price, availability, retailer, link, details, type FROM watchlist_cpu RIGHT JOIN cpus ON watchlist_cpu.product_id = cpus.id $1:raw", where)
        .then(cpus => {
            return cpus;
        })
        .catch(err => {
            console.log(err)
            return null;
        })

        const gpuList = await dbase.manyOrNone("SELECT id, image, brand, model, price, availability, retailer, link, details, type FROM watchlist_gpu RIGHT JOIN gpus ON watchlist_gpu.product_id = gpus.id $1:raw", where)
        .then(gpus => {
            return gpus;
        })
        .catch(err => {
            console.log(err);
            return null;
        })
        
        cpuList.push(...gpuList)
        return cpuList
    }


    return {
        addCPUToWatchlist,
        addGPUToWatchlist,
        getWatchlist
    }
}