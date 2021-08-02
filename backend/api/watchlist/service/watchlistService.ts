import Errors = require("../../errors/ErrorTypes");
const InvalidRequestError = Errors.InvalidRequestError;
import WatchlistRepo = require("../repository/watchlistRepo");
import jwtUtil from '../../utilities/jwtUtil';

const watchlistRepo = WatchlistRepo();

export = (watchRepo = watchlistRepo) => {

    const addProduct = async(request) => {
        if (!('type' in request) || !('productID' in request))
            throw new InvalidRequestError('missing parameter(s)');
        let result;
        if (request.type == "CPU") {
            result = await watchRepo.addCPUToWatchlist(request.user.id, request.productID);
        }
        else if (request.type == "GPU") {
            result = await watchRepo.addGPUToWatchlist(request.user.id, request.productID);
        }

        if (result == true)
            return
        throw new Error()
    }

    const getWatchlist = async(user) => {
        let result = await watchRepo.getWatchlist(user.id)
        .then(res => {
            return res;
        })
        .catch(err => {
            return null;
        })
        if(result == null)
            throw new Error()
        return result;
    }

    const removeProduct = async(request) => {
        if (!('productID' in request))
            throw new InvalidRequestError('missing parameter(s)');
        return await watchRepo.removeProduct(request.user.id, request.productID, request.type)
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        })
    }

    return {
        addProduct,
        getWatchlist,
        removeProduct
    }
}