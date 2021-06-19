const repo = {}

const InvalidRequestError = require('../../errors/InvallidRequest.error')
const watchlistRepo = require('../../watchlist/repository/watchlistRepo')
const watchlistService = require('../../watchlist/service/watchlistService')(repo)

describe('WatchlistService test', () => {

    beforeEach(() => {
        repo.addCPUToWatchlist = jest.fn((userID, productID) => { return true; })
        repo.addGPUToWatchlist = jest.fn((userID, productID) => { return true; })
        repo.getWatchlist = jest.fn((userID) => Promise.resolve([{}]))
        repo.removeProduct = jest.fn((userID , productID, productType) => Promise.resolve(true))
    })

    it('testing successful adding a CPU product', async() => {
        await watchlistService.addProduct({
            "type": "CPU",
            "productID": "product"
        },
        {
            "id": 1
        });

        expect(repo.addCPUToWatchlist.mock.calls.length).toBe(1)
        expect(repo.addGPUToWatchlist.mock.calls.length).toBe(0)
        expect(repo.getWatchlist.mock.calls.length).toBe(0)
        expect(repo.removeProduct.mock.calls.length).toBe(0)
        expect(repo.addCPUToWatchlist.mock.calls[0][0]).toBe(1)
        expect(repo.addCPUToWatchlist.mock.calls[0][1]).toBe("product")
    })

    it('testing successful adding a GPU product', async() => {
        await watchlistService.addProduct({
            "type": "GPU",
            "productID": "product"
        },
        {
            "id": 1
        });

        expect(repo.addGPUToWatchlist.mock.calls.length).toBe(1)
        expect(repo.addCPUToWatchlist.mock.calls.length).toBe(0)
        expect(repo.getWatchlist.mock.calls.length).toBe(0)
        expect(repo.removeProduct.mock.calls.length).toBe(0)
        expect(repo.addGPUToWatchlist.mock.calls[0][0]).toBe(1)
        expect(repo.addGPUToWatchlist.mock.calls[0][1]).toBe("product")
    })

    it('testing retrieval of users watchlist', async() => {
        let response = await watchlistService.getWatchlist({
            "id": 1
        });

        expect(repo.getWatchlist.mock.calls.length).toBe(1)
        expect(repo.getWatchlist.mock.calls[0][0]).toBe(1)
        expect(response).toStrictEqual([{}])
    })

    it('testing successful removal of product', async() => {
        let response = await watchlistService.removeProduct({
            "type": "CPU",
            "productID": "ID"
        },
        {
            "id": 1
        })

        expect(response).toBe(true)
        expect(repo.removeProduct.mock.calls[0][0]).toBe(1)
        expect(repo.removeProduct.mock.calls[0][1]).toBe("ID")
        expect(repo.removeProduct.mock.calls[0][2]).toBe("CPU")
        expect(repo.removeProduct.mock.calls.length).toBe(1)
    })
})