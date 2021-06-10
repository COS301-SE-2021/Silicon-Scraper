const configs = require('../../../config.js');
const {Client} = require('pg');
const {v4 : uuidv4} = require('uuid');
const bcrypt = require('bcrypt');

const client = new Client({
    user: configs.user,
    host: configs.host,
    database: configs.name,
    password: configs.pw,
    port: configs.port
});


/**
 * 
 * @param {} request 
 * @returns 
 */


module.exports = class UserService {

    constructor(database) {
        if (!database) {
            client.connect();
            this.database = client;
            return;
        }
        console.info("I am here");
        this.database = database;
    }

    async register(request) {
        console.info("within request");

        return new Promise((resolve, reject) => {
            console.info("inside promise");

            if (!('username' in request) || !('password' in request)) {
                console.warn("Rejected request");
                reject({
                    message: "Properties are missing",
                    statusCode: 400
                });
                return;
            }
            console.info("after if");
    
            const id = uuidv4();

            console.info("after id");

            let errorResponse = {
                message: "An error occurred",
                status: 500
            };

            console.info("after uuid: " + id);

            bcrypt.hash(request.password, 15)
            .then(hash => {
                console.info("hash: " + hash);
                const query = `INSERT INTO Users(id,  username, password) VALUES ('${id}', '${request.username}', '${hash}')`;
                return this.database.query(query)
                .then(response => {
                    resolve({
                        message: "User succeffully registered",
                        statusCode: 201
                    });
                })
                .catch(err => {
                    console.log(err);
                    reject(errorResponse);
                });
            })
            .catch(err => {
                console.log(err);
                reject(errorResponse);
            });
        });
    }

    login(request) {
        return new Promise((resolve, reject) => {
            if (!('username' in request) || !('password' in request)) {
                reject({
                    message: "Properties are missing",
                    statusCode: 400
                });
                return;
            }
        });
    }

    deleteUser(request) {
    
    };
    
    addToWatchlist(request) {
    
    }
    
    removeFromWatchlist(request) {
    
    } 

}