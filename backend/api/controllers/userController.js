const userService = require('../services/userService.js');

const register_user = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    userService.register(username, password);
    res.status(201).json({response: "Account created."});
};

const login_user = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const result = userService.login(username, password);
    if (result == "jwt")
        res.status(200).json({jwt: result});
    else
        res.status(401).json({error:"User not found"});
};

const delete_user = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    userService.remove(username, password);
    res.status(200);
};

const add_to_watchlist = (req, res) => {

    userService.addToWatchlist(req.body);
    res.send("Product has been added to user's watch list");
};

const remove_from_watchlist = (req, res) => {
    userService.removeFromWatchlist(req.body);
    res.status(200);
};

module.exports = {
    register_user,
    login_user,
    delete_user,
    add_to_watchlist,
    remove_from_watchlist
};