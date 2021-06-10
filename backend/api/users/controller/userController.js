const express = require('express');
const router =  express.Router();
const UserService = require('../service/userService.js');
const userService = new UserService(null);
const jwtUtil = require('../../utilities/jwtUtil.js');

router.post('/', async (req, res) => {
    return await userService.register(req.body)
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