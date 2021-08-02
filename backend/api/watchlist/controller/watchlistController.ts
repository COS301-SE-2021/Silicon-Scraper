import express from "express";
import ErrorTypes from "../../errors/ErrorTypes";
import jwtUtil from '../../utilities/jwtUtil';
import WatchlistService from "../service/watchlistService";

const watchlistService = WatchlistService();
const InvalidRequestError = ErrorTypes.InvalidRequestError;
const router: express.Router = express.Router();

router.post('/', jwtUtil.verifyToken, async(req, res) => {
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
            errorMessage = "Failed"
        }

        res.json({
            message: errorMessage
        })
        .send()
    })
})

router.get('/', jwtUtil.verifyToken, async(req, res) => {
    const result = await watchlistService.getWatchlist(req.body.user)
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
        .send()
    })
})

router.delete('/',  jwtUtil.verifyToken, async(req, res) => {
    await watchlistService.removeProduct(req.body)
    .then(resp => {
        res.status(200)
        .json({
            message: "Success"
        }).send()
    })
    .catch(err => {
        res.status(500)
        .json({
            message: "Failed"
        })
        .send()
    })
})

export default router;