import express from 'express';
import UserService from '../service/userService';
import ErrorTypes from '../../errors/ErrorTypes';

const InvalidRequestError = ErrorTypes.InvalidRequestError;
const RegisterError = ErrorTypes.RegisterError;
const LoginError = ErrorTypes.LoginError;
const UsernameNotFoundError = ErrorTypes.UsernameNotFoundError;

const router: express.Router = express.Router();
const userService = UserService();

//Look for cleaner way to do this
//My exception handling is messy

router.post('/', async (req, res) => {
    try {
        const result = await userService.register(req.body);
        res.status(201).json({token: result});
    } catch(error) {
        let errorMessage = '';
        if (error instanceof InvalidRequestError) {
            res.status(400);
            errorMessage = "Missing parameters";
        }
        else if (error instanceof RegisterError) {
            res.status(200);
            errorMessage = "Username already exists";
        }
        else if (error instanceof Error) {
            res.status(500);
        }
        res.json({message: errorMessage});
    }
});

router.post('/login', async (req, res) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({token: result});
    } catch(error) {
        let errorMessage = '';
        if (error instanceof InvalidRequestError) {
            res.status(400);
            errorMessage = "Missing parameters";
        }
        else if (error instanceof LoginError || error instanceof UsernameNotFoundError) {
            res.status(200);
            errorMessage = "Invalid credentials";
        }
        res.json({message: errorMessage});
    }
});

router.delete('/', (req, res) => {
    res.status(501).send()
});

export default router;