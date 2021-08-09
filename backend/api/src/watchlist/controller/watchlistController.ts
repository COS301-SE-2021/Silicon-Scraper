import express from "express";
import { getRepository } from "typeorm";
import { watchlistGPU } from "../../entity/watchlistGPU";
import { AddProductRequest, RemoveProductRequest, RetrieveWatchlistRequest } from "../../types/Requests";
import { RetrieveWatchlistResponse } from "../../types/Responses";
import WatchlistService from "../service/watchlistService";

const watchGPURepository = getRepository(watchlistGPU);
const watchCPURepository = getRepository(watchlistGPU);
const watchlistService = new WatchlistService(watchGPURepository, watchCPURepository);
const router: express.Router = express.Router();

// router.use(jwtUtil.verifyToken);

router.post('/', async(req, res) => {
    try {
        await watchlistService.addProduct(<AddProductRequest>req.body);
        res.status(201);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});

router.get('/', async(req, res) => {
    try {
        const response: RetrieveWatchlistResponse = await watchlistService.retrieveWatchlist(<RetrieveWatchlistRequest>req.body);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
})

router.delete('/', async(req, res) => {
    try {
        await watchlistService.removeProduct(<RemoveProductRequest>req.body);
        res.status(204);
    } catch(error) {
        res.status(500).json(error.message);
    }
});

export default router;