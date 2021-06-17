const express = require('express');
const router =  express.Router();
const userService = require('../service/userService.js')()
const jwtUtil = require('../../utilities/jwtUtil.js');
const InvalidRequestError = require('../../errors/InvallidRequest.error.js');
const RegisterError = require('../../errors/Register.error.js');
const LoginError = require('../../errors/Login.error');
const UsernameNotFoundError = require('../../errors/UsernameNotFound.error.js');

//Look for cleaner way to do this
//My exception handling is messy

router.post('/', async (req, res) => {
    await userService.register(req.body)
    .then(response => {
        res.status(201)
        .json({
            token: response
        })
        .send();
    })
    .catch(error => {
        let errorMessage;
        if (error instanceof InvalidRequestError) {
            res.status(400)
            errorMessage = "Missing parameters"
        }
        else if (error instanceof RegisterError) {
            res.status(200)
            errorMessage = "Username already exists"
        }
        else if (error instanceof Error) {
            res.status(500)
        }
        res.json({
            message: errorMessage
        })
        .send()
    });
});


router.post('/login', async (req, res) => {
    await userService.login(req.body)
    .then(response => {
        console.log("Hello: " + response)
        res.status(200)
        .json({
            token: response
        })
        .send()
    })
    .catch(error => {
        let errorMessage;
        if (error instanceof InvalidRequestError) {
            res.status(400)
            errorMessage = "Missing parameters"
        }
        else if (error instanceof LoginError && error instanceof UsernameNotFoundError) {
            res.status(200)
            errorMessage = "Invalid credentials"
        }
        res.json({
            message: errorMessage
        })
        .send()
    })
});


router.delete('/', (req, res) => {
    res.status(501).send()
});


router.post('/watchlist', (req, res) => {
    res.status(501).send()
});


router.delete('/watchlist', jwtUtil.verifyToken, (req, res) => {
    res.status(501).send()
});

module.exports = router;