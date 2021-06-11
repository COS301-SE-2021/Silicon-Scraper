const express = require('express');
const router =  express.Router();
const UserService = require('../service/userService.js');
const userService = new UserService();
const jwtUtil = require('../../utilities/jwtUtil.js');

router.post('/', async (req, res) => {
    await userService.register(req.body)
    .then(response => {
        res.status(response.statusCode).json(response);
    })
    .catch(error => {
        res.status(500)
    });
});


router.post('/login', async (req, res) => {
    await userService.login(req.body)
    .then(response => {
        res.status(response.statusCode).json(response)
    })
    .catch(error => {
        res.status(500)
    })
});


router.delete('/', jwtUtil.verifyToken, (req, res) => {
    res.status(501);
});


router.post('/watchlist', jwtUtil.verifyToken, (req, res) => {
    res.status(501);
});


router.delete('/watchlist', jwtUtil.verifyToken, (req, res) => {
    res.status(501);
});

module.exports = router;