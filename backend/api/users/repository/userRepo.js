const configs = require('../../../config');
const {v4 : uuidv4} = require('uuid');
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
) // PostgreSQL db object that will be used to perform CRUD operations

const cs = new pgp.helpers.ColumnSet(['id', 'username', 'hash'], {table: 'users'})

/**
 * 
 * @param {object} dbase a postgreSQL database object
 * @returns {object} of functions of crud operations, add (to insert a user to the db)
 *          & get (to retrieve auser from the database)
 */

module.exports = (dbase = db) => {

    /**
     * This function handles adding a new user of the silicon scraper platform
     * to the database. If the insert query was successful then it returns true.
     * If an error had occurred during insertion then false is then returned.
     * 
     * @param {string} username 
     * @param {string} password 
     * @returns {boolean} determining whether the query was successful or not
     */

    const addUser = async(username, password) => {
        const id = uuidv4();
        const user = {
            id: id,
            username: username,
            hash: password
        };
        const query = pgp.helpers.insert(user, cs);
        let result = await dbase.none(query)
        .then(res => {
            return true;
        })
        .catch(err => {
            console.error(err);
            return false;
        })

        return result;
    }
    
    /**
     * This function handles the operation of getting a user (given a username)
     * from the database. If a user is found itwill return an object with the person's
     * details. If a user is not found it returns an empty object.
     * 
     * If an error occurred during the runtime of teh function then null will be returned.
     * (simulating the result of a user not being found)
     * 
     * @param {string} username 
     * @returns {object} with a found user's details or null
     */

    const getUser = async (username) => {
        const where = pgp.as.format('WHERE username = $1', username);
        let result = await dbase.oneOrNone("SELECT * FROM users $1:raw", where)
        .then(user => {
            return user;
        })
        .catch(err => {
            console.log(err) 
            return null;
        })

        return result;
    }

    return {
        addUser,
        getUser
    }
}
