import { Router } from "express";
import { UserController } from "../controllers/userController.js";
const userController = new UserController();
const routes = Router();
routes.post('/addToWatchList', userController.addToWatchlist);
export default routes;
