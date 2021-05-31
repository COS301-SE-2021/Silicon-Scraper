import {Router} from "express";
const UserController = require('../controllers/userController.ts');
const userController = UserController();
const routes = Router();

routes.post('/addToWatchList', userController.addToWatchList);

export default routes;