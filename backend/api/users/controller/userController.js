const express = require('express');
const router =  express.Router();
const userService = require('../services/userService.js');

router.post('/', async (req, res) => {
    return userService.register(req.body)
    .then(response => {
        return res.status(response.statusCode).json(response);
    })
    .catch(error => {
        return res.status(error.statusCode).json(error);
    });
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