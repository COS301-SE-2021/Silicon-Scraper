import express from 'express';
import 'reflect-metadata';
import { getRepository, Repository } from 'typeorm';
import helmet from 'helmet';
import { connection } from './config';
import { CPU } from './entity/cpu';
import { GPU } from './entity/gpu';
import { User } from './entity/user';
import { watchlistCPU } from './entity/watchlistCPU';
import { watchlistGPU } from './entity/watchlistGPU';
import recommendationController from './recommendation/controller/recommendationController';
import {ReviewSentiment} from './entity/reviewSentiment';
import productRoutes from './products/productRoutes';
import UserController from './users/controller/userController';
import UserService from './users/service/userService';
import jwtUtil from './utilities/jwtUtil';
import passwordEncoder from './utilities/passwordEncoder';
import WatchlistController from './watchlist/controller/watchlistController';
import WatchlistService from './watchlist/service/watchlistService';
import SentimentContoller from "./sentiment/controller/sentimentContoller";
import SentimentService from "./sentiment/service/sentimentService";

const app = express();

const connect = async () => {
    await connection();
    const userRepository: Repository<User> = getRepository(User);
    const userService: UserService = new UserService(userRepository, jwtUtil, passwordEncoder);
    const userController: UserController = new UserController(userService);

    const watchGPURepository: Repository<watchlistGPU> = getRepository(watchlistGPU);
    const watchCPURepository: Repository<watchlistCPU> = getRepository(watchlistCPU);
    const gpuRepository: Repository<GPU> = getRepository(GPU);
    const cpuRepository: Repository<CPU> = getRepository(CPU);
    const watchlistService: WatchlistService = new WatchlistService(watchGPURepository, watchCPURepository, cpuRepository, gpuRepository);
    const watchlistController: WatchlistController = new WatchlistController(watchlistService);

    const sentimentRepository: Repository<ReviewSentiment> = getRepository(ReviewSentiment);
    const sentimentService: SentimentService = new SentimentService(sentimentRepository);
    const sentimentController: SentimentContoller = new SentimentContoller(sentimentService);


    app.use(express.json({limit: '2kb'}));
    app.use(helmet());
    app.use('/products', productRoutes);
    app.use('/users', userController.routes());
    app.use('/watchlist', watchlistController.routes());
    app.use('/recommendation', recommendationController);
    app.use('/sentiment', sentimentController.routes());
    app.use((req, res, next) => {
        res.status(404).json({
            status: 404,
            error: 'Not Found'
        });
    });

    app.use((err, req, res, next) => {
        let msg: string = 'An error occurred';
        let status: number = 500;
        if (err instanceof Object || typeof err === 'object') {
            msg = err.message || msg;
            status = err.status || status;
        } 
        res.status(status).json({error: msg})
    }) 
}

connect();

export default app;