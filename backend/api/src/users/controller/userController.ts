import express from 'express';
import UserService from '../service/userService';
import { getRepository, Repository } from 'typeorm';
import { User } from '../../entity/user';
import { CreateUserRequest, LoginUserRequest } from '../../types/Requests';
import { CreateUserResponse, LoginUserResponse } from '../../types/Responses';

const router: express.Router = express.Router();
const userRepository: Repository<User> = getRepository(User);
const userService = new UserService(userRepository);

//Look for cleaner way to do this
//My exception handling is messy

router.post('/', async (req, res) => {
    try {
        const result: CreateUserResponse = await userService.createUser(<CreateUserRequest>req.body);
        res.status(201).json(result);
    } catch(error) {
        res.status(500).json(error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const result: LoginUserResponse = await userService.loginUser(<LoginUserRequest>req.body);
        res.status(200).json(result);
    } catch(error) {
        res.status(500).json(error);
    }
});

router.delete('/', (req, res) => {
    res.status(501).send()
});

export default router;