const products = [];
const users = [];

const register_user = (req, res) => {
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

const login_user = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    res.status(200).json({jwt: "jwt"});
};

const delete_user = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    res.status(200);
};

const add_to_watchlist = (req, res) => {

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
    register_user,
    login_user,
    delete_user,
    add_to_watchlist
};