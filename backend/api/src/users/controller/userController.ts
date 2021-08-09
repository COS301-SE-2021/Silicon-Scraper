import express, { Router } from 'express';
import UserService from '../service/userService';
import { getRepository, Repository } from 'typeorm';
import { User } from '../../entity/user';
import { CreateUserRequest, LoginUserRequest } from '../../types/Requests';
import { CreateUserResponse, LoginUserResponse } from '../../types/Responses';

export default class UserController {

    private router: Router;

    constructor(
        private readonly userService: UserService
    ){
        this.router = Router();
    }

    async signUpRoute(request: CreateUserRequest): Promise<CreateUserResponse> {
        return await this.userService.createUser(request);
    }

    async loginRoute(request: LoginUserRequest): Promise<LoginUserResponse> {
        return this.userService.loginUser(request);
    }

    routes(): Router {
        this.router.post('/', async(req, res, next) => res.status(201).json(await this.signUpRoute(<CreateUserRequest>req.body).catch(err => next(err))));
        this.router.post('/login', async(req, res, next) => res.status(200).json(await this.userService.loginUser(<LoginUserRequest>req.body).catch(err => next(err))));
        this.router.delete('/', async(req, res) => res.status(501));
        return this.router;
    }


}

// router.post('/', async (req, res) => {
//     try {
//         const result: CreateUserResponse = await userService.createUser(<CreateUserRequest>req.body);
//         res.status(201).json(result);
//     } catch(error) {
//         res.status(500).json(error.message);
//     }
// });

// router.post('/login', async (req, res) => {
//     try {
//         const result: LoginUserResponse = await userService.loginUser(<LoginUserRequest>req.body);
//         res.status(200).json(result);
//     } catch(error) {
//         res.status(500).json(error);
//     }
// });

// router.delete('/', (req, res) => {
//     res.status(501).send()
// });

// export default router;