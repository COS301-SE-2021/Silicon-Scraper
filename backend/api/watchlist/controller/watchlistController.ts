import express from "express";
import ErrorTypes from "../../errors/ErrorTypes";
import jwtUtil from '../../utilities/jwtUtil';
import WatchlistService from "../service/watchlistService";

const watchlistService = WatchlistService();
const InvalidRequestError = ErrorTypes.InvalidRequestError;
const router: express.Router = express.Router();

// router.use(jwtUtil.verifyToken);

router.post('/', async(req, res) => {
    try {
        const result = await watchlistService.addProduct(req.body);
        res.status(201).json({message: "Success"});
    } catch(error) {
        let errorMessage: string;
        if (error instanceof InvalidRequestError) {
            res.status(400)
            errorMessage = "Missing parameters"
        }
        else {
            res.status(500)
            errorMessage = "Failed"
        }
        res.json({message: errorMessage});
    }
})

router.get('/', async(req, res) => {
    try {
        const resp = await watchlistService.getWatchlist(req.body.user);
        res.status(200).json(resp);
    } catch(error) {
        res.status(500).json({message: "An error occurred"})
    }
})

router.delete('/', async(req, res) => {
    try {
        await watchlistService.removeProduct(req.body);
        res.status(200).json({message: "Success"});
    } catch(error) {
        res.status(500).json({message: "Failed"});
    }
})

export default router;