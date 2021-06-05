const { mockUserDB, mockUserWatchlist } = require('../../mocks/userMocks.js');

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