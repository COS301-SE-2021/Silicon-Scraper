import { UserService } from "../service/userService.js";
const userService = new UserService();
export class UserController {
    addToWatchlist(req, res) {
        userService.addToWatchList(req);
        res.send("Product has been added to user's watch list");
    }
}
