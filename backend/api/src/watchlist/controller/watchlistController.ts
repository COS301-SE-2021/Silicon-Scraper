import express, { Router } from "express";
import { AddProductRequest, RemoveProductRequest, RetrieveWatchlistRequest } from "../../types/Requests";
import { RetrieveWatchlistResponse } from "../../types/Responses";
import jwtUtil from "../../utilities/jwtUtil";
import WatchlistService from "../service/watchlistService";

export default class WatchlistController {

    private router: Router;

    constructor(
        private readonly watchlistService: WatchlistService
    ) {
        this.router = Router();
    }

    async addToWatchlist(request: AddProductRequest): Promise<void> {
        return await this.watchlistService.addProduct(request);
    }

    async getWatchlist(request: RetrieveWatchlistRequest): Promise<RetrieveWatchlistResponse> {
        return await this.watchlistService.retrieveWatchlist(request);
    }

    async removeFromWatchlist(request: RemoveProductRequest): Promise<void> {
        return await this.watchlistService.removeProduct(request);
    }

    routes(): Router {
        this.router.use(jwtUtil.verifyToken);
        this.router.post('/', async(req, res, next) => res.status(201).json(await this.addToWatchlist(<AddProductRequest>req.body).catch(err => next(err))));
        this.router.get('/', async(req, res, next) => res.status(200).json(await this.getWatchlist(<RetrieveWatchlistRequest>req.body).catch(err => next(err))));
        this.router.delete('/', async(req, res, next) => { 
             await this.removeFromWatchlist(<RemoveProductRequest>req.body).catch(err => {next(err); return}); res.status(204).send()});
        return this.router;
    }
}