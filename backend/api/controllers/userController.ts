import {UserService} from "../service/userService";
const userService = new UserService();

exports.addToWatchlist = (req, res) => {
    userService.addToWatchList(req);
    res.send("Product has been added to user's watch list");
}