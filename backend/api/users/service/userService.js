const { mockUserDB, mockUserWatchlist } = require('../../mocks/userMocks.js');

const configs = require('../../../config.js');
const {Client} = require('pg');

const client = new Client({
    user: configs.user,
    host: configs.host,
    database: configs.name,
    password: configs.pw,
    port: configs.port
});

client.connect();

const register = (username, password) => {
    if (typeof username != "string" || typeof password != "string")
        throw new TypeError("Invalid parameter type");
    let result = true;
    mockUserDB.forEach( (user, index) => {
        if (user.username == username) {
            result = false;
            return;
        }
    });

    if (result == true) {
        const user = {
            id: mockUserDB.length + 1,
            username,
            password,
            wishlist: []
        };
        mockUserDB.push(user);
        return true;
    }
    return false;
};

const login = (username, password) => {
    if (typeof username != "string" || typeof password != "string")
        throw new TypeError("Invalid parameter type");
    let result = false;
    mockUserDB.forEach( (user, index) => {
        if (user.username == username && user.password == password) {
            result = true;
            return;
        }
    });
    return result;
}

const deleteUser = (username, password) => {
    if (typeof username != "string" || typeof password != "string")
        throw new TypeError("Invalid parameter type");
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