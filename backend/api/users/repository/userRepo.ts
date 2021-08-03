import { v4 } from 'uuid';
import pool from '../../database';

/**
 * 
 * @param {object} dbase a postgreSQL database object
 * @returns {object} of functions of crud operations, add (to insert a user to the db)
 *          & get (to retrieve auser from the database)
 */

export = () => {

    /**
     * This function handles adding a new user of the silicon scraper platform
     * to the database. If the insert query was successful then it returns true.
     * If an error had occurred during insertion then false is then returned.
     * 
     * @param {string} username 
     * @param {string} password 
     * @returns {boolean} determining whether the query was successful or not
     */

    const addUser = async (username, password) => {
        const id = v4();
        const client = await pool.connect();
        
        try {
            const sqlQuery = `INSERT INTO users VALUES ('${id}', ${username}, ${password})`;
            const data = await client.query(sqlQuery);
            return id;
        } catch(error) {
            return null;  
        } finally {
            client.release();
        }
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
        const client = await pool.connect();
        
        try {
            const sqlQuery = `SELECT * FROM users WHERE username = ${username}`;
            const data = await client.query(sqlQuery);
            return data.rows;  
        } catch(error) {
            return null;
        } finally {
            client.release();
        }
    }

    return {
        addUser,
        getUser
    }
}

