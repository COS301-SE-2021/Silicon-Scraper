const { mockUserDB, mockUserWatchlist } = require('../../mocks/userMocks.js');

const configs = require('../../../config.js');
const {Client} = require('pg');
const uuidv4 = require('uuid');

const client = new Client({
    user: configs.user,
    host: configs.host,
    database: configs.name,
    password: configs.pw,
    port: configs.port
});

client.connect();

const register = (request) => {
    if (!('username' in request) || !('password' in request)) {
        return undefined;
    }
    const id = uuidv4();
    const query = `INSERT INTO Users(id, username, password) VALUES ('${id}', '${request.username}', '${request.password}')`;
    return client.query(query)
    .then(response => {
        return {
            message: "User successfully registered",
            statusCode: 201
        }
    })
    .catch(err => {
        console.log(err);
        return {
            message: "An error occurred",
            statusCode: 500
        }
    })
};

const login = (username, password) => {
    
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