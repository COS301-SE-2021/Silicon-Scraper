const router = require('express').Router();
const watchlistService = require('../service/watchlistService')()
const InvalidRequestError = require('../../errors/InvallidRequest.error');
const jwtUtil = require('../../utilities/jwtUtil')

router.post('/', jwtUtil.verifyToken, async(req, res) => {
    await watchlistService.addProduct(req.body, req.user)
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
            errorMessage = "Failed"
        }

        res.json({
            message: errorMessage
        })
        .send()
    })
})

router.get('/', jwtUtil.verifyToken, async(req, res) => {
    const result = await watchlistService.getWatchlist(req.user)
    .then(resp => {
        res.status(200)
        .json(resp)
        .send()
    })
    .catch(err => {
        console.log(err)
        res.status(500)
        .json({
            message: "An error occurred"
        })
    })
})

router.delete('/',  jwtUtil.verifyToken, async(req, res) => {
    console.log(req.user)
    res.status(200).send()
})

module.exports = router;