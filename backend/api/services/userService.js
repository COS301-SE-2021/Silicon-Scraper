const mockUserWatchlist = [];
const mockUserDB = [];

const register = (username, password) => {
    const user = {
        id: mockUserDB.length + 1,
        username,
        password,
        wishlist: []
    };

    mockUserDB.push(user);
};

const login = (username, username) => {
    
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
    remove,
    addToWatchlist,
    removeFromWatchlist
};