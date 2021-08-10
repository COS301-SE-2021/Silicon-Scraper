import express from 'express';
import 'reflect-metadata';
import { getRepository, Repository } from 'typeorm';
import { connection } from './config';
import { User } from './entity/user';
import { watchlistCPU } from './entity/watchlistCPU';
import { watchlistGPU } from './entity/watchlistGPU';

import productRoutes from './products/productRoutes';
import UserController from './users/controller/userController';
import UserService from './users/service/userService';
import jwtUtil from './utilities/jwtUtil';
import passwordEncoder from './utilities/passwordEncoder';
import WatchlistController from './watchlist/controller/watchlistController';
import WatchlistService from './watchlist/service/watchlistService';

const app = express();

const connect = async () => {
    await connection();
    const userRepository: Repository<User> = getRepository(User);
    const userService: UserService = new UserService(userRepository, jwtUtil, passwordEncoder);
    const userController: UserController = new UserController(userService);

    const watchGPURepository: Repository<watchlistGPU> = getRepository(watchlistGPU);
    const watchCPURepository: Repository<watchlistCPU> = getRepository(watchlistCPU);
    const watchlistService: WatchlistService = new WatchlistService(watchGPURepository, watchCPURepository);
    const watchlistController: WatchlistController = new WatchlistController(watchlistService);

    app.use(express.json());
    app.use('/products', productRoutes);
    app.use('/users', userController.routes());
    app.use('/watchlist', watchlistController.routes());
    app.use((req, res, next) => {
        res.json({
            status: 404,
            error: 'Not Found'
        });
    });

    app.use((err, req, res, next) => {
        res.status(500);
    }) 
}

connect();

export default app;