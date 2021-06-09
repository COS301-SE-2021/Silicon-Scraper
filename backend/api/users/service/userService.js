const { mockUserDB, mockUserWatchlist } = require('../../mocks/userMocks.js');

const configs = require('../../../config.js');
const {Client} = require('pg');
const uuidv4 = require('uuid');
const bcrypt = require('bcrypt');
const { response } = require('express');

const client = new Client({
    user: configs.user,
    host: configs.host,
    database: configs.name,
    password: configs.pw,
    port: configs.port
});

client.connect();

/**
 * 
 * @param {} request 
 * @returns 
 */

const register = (request) => {
    return new Promise((resolve, reject) => {
        
        if (!('username' in request) || !('password' in request)) {
            reject({
                message: "Properties are missing",
                statusCode: 400
            });
            return;
        }

        const id = uuidv4();
        let errorResponse = {
            message: "An error occurred",
            status: 500
        };
        bcrypt.hash(request.password, 20)
        .then(hash => {
            const query = `INSERT INTO Users(id,  username, password) VALUES ('${id}', '${request.username}', '${hash}')`;
            return client.query(query)
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
};

const login = (request) => {
    return new Promise((resolve, reject) => {
        if (!('username' in request) || !('password' in request)) {
            reject({
                message: "Properties are missing",
                statusCode: 400
            });
            return;
        }
    });
} ;

const holder = () => {
    if (!('username' in request) || ('password' in request)) {
        return undefined;
    }
    const query = `SELECT * FROM Users WHERE username='${request.username}'`;
    return client.query(query)
    .then(response => {
        console.log(response.row[0]);
    })
    .catch(err => {
        console.log(err);
        return {
            statusCode: 500,
            message: "An error occurred"
        }
    })
}

const deleteUser = (username, password) => {
    
};

const addToWatchlist = (body) => {

}

const removeFromWatchlist = (body) => {

} 

module.exports = {
    register,
    login,
    deleteUser,
    addToWatchlist,
    removeFromWatchlist
};