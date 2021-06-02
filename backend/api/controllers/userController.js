const products = [];
const users = [];

const register = (req, res) => {
    users
}

const addToWatchlist = (req, res) => {

    const product = {
        "id": 1,
        "brand": "",
        "model": "",
        "url": "",
        "img": "",
        "description": "",
        "retailer": "",
        "price": 0,
        "availability": 1
    };

    products.wishlist.push(product);
    res.send("Product has been added to user's watch list");
};

module.exports = {
    addToWatchlist
};