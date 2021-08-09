import express from 'express';
import 'reflect-metadata';
import { getRepository, Repository } from 'typeorm';
import { connection } from './config';
import { User } from './entity/user';

import productRoutes from './products/productRoutes';
import UserController from './users/controller/userController';
import UserService from './users/service/userService';
import watchlistController from './watchlist/controller/watchlistController';

const app = express();

const connect = async () => {
    await connection();
    const userRepository: Repository<User> = getRepository(User);
    const userService: UserService = new UserService(userRepository);
    const userController: UserController = new UserController(userService)

    app.use(express.json());
    app.use('/products', productRoutes);
    app.use('/users', userController.routes());
    app.use('/watchlist', watchlistController);
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