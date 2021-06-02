const products = [];
const users = [];

const register = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = {
        id: users.length + 1,
        username,
        password
    };
    users.push(user);
    res.status(201);
};

const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    res.status(200).json({jwt: "jwt"});
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