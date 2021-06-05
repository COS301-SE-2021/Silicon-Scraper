const express = require('express');
const router =  express.Router();
const userService = require('../services/userService.js');

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let success = userService.register(username, password);
    if (success == true)
        res.status(201).json({response: "Account created."});
    else
        res.status(401).json({error: "User already exists."});
});


router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const result = userService.login(username, password);
    if (result == "jwt")
        res.status(200).json({jwt: result});
    else
        res.status(404).json({error:"User not found"});
});


router.delete('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    userService.remove(username, password);
    res.status(200);
});


router.post('/watchlist', (req, res) => {

    userService.addToWatchlist(req.body);
    res.send("Product has been added to user's watch list");
});


router.delete('/watchlist', (req, res) => {
    userService.removeFromWatchlist(req.body);
    res.status(200);
});

module.exports = router;