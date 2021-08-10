import { CPU } from "../entity/cpu";
import { GPU } from "../entity/gpu";
import { watchlistCPU } from "../entity/watchlistCPU";
import { watchlistGPU } from "../entity/watchlistGPU";

export default class Broadcast {
    /**
     * Send notification to client
     */
    public broadcast = (product: CPU | GPU) => {
        // for every subscribed user, fetch watchlist and check if product is in their watchlist
        // if contained in watchlist, send notification
    }
    
}