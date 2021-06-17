const router = require('express').Router();
const { request } = require('express');
const watchlistService = require('../service/watchlistService');

router.post('/', async(req, res) => {
    await watchlistService.addProduct(req.body)
    .then(response => {
        res.status(201)
        .json({
            message: "Success"
        })
        .send()
    })
    .catch(error => {
        let errorMessage;
        if (error instanceof InvalidRequestError) {
            res.status(400)
            errorMessage = "Missing parameters"
        }
        else {
            res.status(500)
            errorMessage = "An error occurred"
        }

        res.json({
            message: errorMessage
        })
        .send()
    })
})

router.get('/:uid', async(req, res) => {
    let request = {
        userID: request.params.uid
    }
    const result = await watchlistService.getWatchlist(request)
    .then(res => {
        res.status(200)
        .json({
            result
        })
        .send()
    })
    .catch(err => {
        res.status(500)
        .json({
            message: "An error occurred"
        })
    })
})

router.delete('/', async(req, res) => {
    res.status(501)
})