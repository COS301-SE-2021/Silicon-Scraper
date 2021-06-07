const express = require('express');
const router =  express.Router();
const userService = require('../services/userService.js');

router.post('/', async (req, res) => {
    const response = await userService.register(req.body);
    if (response == undefined)
        return res.status(400).json({message: "Properties were missing"})
    return res.status(response.statusCode).json(response);
});


router.post('/login', (req, res) => {
    res.status(501);
});


router.delete('/', (req, res) => {
    res.status(501);
});


router.post('/watchlist', (req, res) => {
    res.status(501);
});


router.delete('/watchlist', (req, res) => {
    res.status(501);
});

module.exports = router;