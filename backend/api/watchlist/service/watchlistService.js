const InvalidRequestError = require('../../errors/InvallidRequest.error');
const watchlistRepo = require('../repository/watchlistRepo')()
const jwtUtil = require('../../utilities/jwtUtil')

module.exports = (watchRepo = watchlistRepo) => {

    const addProduct = async(request, user) => {
        if (!('type' in request) || !('productID' in request))
            throw new InvalidRequestError();
        let result;
        if (request.type == "CPU") {
            result = await watchRepo.addCPUToWatchlist(user.id, request.productID);
        }
        else if (request.type == "GPU") {
            result = await watchRepo.addGPUToWatchlist(user.id, request.productID);
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

    const removeProduct = async(request, user) => {
        if (!('productID' in request))
            throw new InvalidRequestError();
        return await watchRepo.removeProduct(user.id, request.productID, request.type)
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