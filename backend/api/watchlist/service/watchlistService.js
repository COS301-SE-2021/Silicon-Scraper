const InvalidRequestError = require('../../errors/InvallidRequest.error');
const watchlistRepo = require('../repository/watchlistRepo');

module.exports = (watchRepo = watchlistRepo) => {

    const addProduct = async(request) => {
        if ('type' in request || 'userID' in request || 'productID' in request)
            throw new InvalidRequestError();
        let result;
        if (request.type == "CPU")
            result = await watchRepo.addCPUToWatchlist(request.userID, request.productID);
        else if (request.type == "GPU")
            result = await watchRepo.addGPUToWatchlist(request.userID, request.productID);
        else
            throw new Error()
    }

    const getWatchlist = async(request) => {
        if ('userID' in request)
            throw new InvalidRequestError();
        let result = await watchRepo.getWatchlist(request.userID);
        if(result == null)
            throw new Error()
        return result;
    }

    const removeProduct = async(request) => {

    }

    return {
        addProduct,
        getWatchlist
    }
}