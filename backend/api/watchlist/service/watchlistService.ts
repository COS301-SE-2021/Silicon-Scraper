import Errors from "../../errors/ErrorTypes";
const InvalidRequestError = Errors.InvalidRequestError;
import WatchlistRepo from "../repository/watchlistRepo";

export = (watchRepo = WatchlistRepo) => {

    const addProduct = async (request) => {
        if (!('type' in request) || !('productID' in request))
            throw new InvalidRequestError('missing parameter(s)');
        let result = false;

        switch(request.type) {
            case 'CPU':
                result = await WatchlistRepo.addCPUToWatchlist(request.user.id, request.productID);
                break;
            case 'GPU':
                result = await watchRepo.addGPUToWatchlist(request.user.id, request.productID);
                break;
            default:
                break;
        }

        if (result !== true)
            throw new Error();
    }

    const getWatchlist = async (user) => {
        let result = await watchRepo.getWatchlist(user.id);
        if(result == null)
            throw new Error()
        return result;
    }

    const removeProduct = async (request) => {
        if (!('productID' in request))
            throw new InvalidRequestError('missing parameter(s)');
        const res = await watchRepo.removeProduct(request.user.id, request.productID, request.type)
        if(res === true) {
            return res;
        }
        throw new Error();
    }

    return {
        addProduct,
        getWatchlist,
        removeProduct
    }
}