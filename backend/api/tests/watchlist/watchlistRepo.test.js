const db = {}

const watchRepo = require('../../watchlist/repository/watchlistRepo')(db)

describe('Watchlist repository integration test', () => {
    const userID = "uID";
    const productID = "pID";

    beforeEach(() => {
        db.none = jest.fn((query) => Promise.resolve())
        db.manyOrNone = jest.fn((query) => Promise.resolve([{}]))
    })

    it('adding a valid GPU product to a watchlist', async() => {
        let response = await watchRepo.addGPUToWatchlist(userID, productID);
        expect(response).toBe(true)
        expect(db.none.mock.calls.length).toBe(1)
        expect(db.none.mock.calls[0][0]).not.toBeNull()
    })

    it('adding a valid CPU product to a watchlist', async() => {
        let response = await watchRepo.addGPUToWatchlist(userID, productID);
        expect(response).toBe(true)
        expect(db.none.mock.calls.length).toBe(1)
        expect(db.none.mock.calls[0][0]).not.toBeNull()
    })

    it('adding a invalid GPU product to a watchlist', async() => {
        db.none = jest.fn((query) => Promise.reject())
        let response = await watchRepo.addGPUToWatchlist(userID, productID);
        expect(response).toBe(false)
        expect(db.none.mock.calls.length).toBe(1)
        expect(db.none.mock.calls[0][0]).not.toBeNull()
    })

    it('adding a invalid CPU product to a watchlist', async() => {
        db.none = jest.fn((query) => Promise.reject())
        let response = await watchRepo.addGPUToWatchlist(userID, productID);
        expect(response).toBe(false)
        expect(db.none.mock.calls.length).toBe(1)
        expect(db.none.mock.calls[0][0]).not.toBeNull()
    })

    it('retrieving a users watchlist with items', async() => {
        let response = await watchRepo.getWatchlist(userID);
        expect(response).toStrictEqual([{}, {}])
        expect(db.manyOrNone.mock.calls.length).toBe(2)
        expect(db.manyOrNone.mock.calls[0][0]).not.toBeNull()
        expect(db.manyOrNone.mock.calls[1][0]).not.toBeNull()
    })

    it('retrieving a users watchlist without items', async() => {
        db.manyOrNone = jest.fn((query) => Promise.resolve([]))
        let response = await watchRepo.getWatchlist(userID);
        expect(response).toStrictEqual([])
        expect(db.manyOrNone.mock.calls.length).toBe(2)
        expect(db.manyOrNone.mock.calls[0][0]).not.toBeNull()
        expect(db.manyOrNone.mock.calls[1][0]).not.toBeNull()
    })

    it('removing products from a users watchlist', async() => {
        let response = await watchRepo.removeProduct(userID, productID, "CPU");
        expect(response).toBe(true)
        expect(db.none.mock.calls.length).toBe(1)
        expect(db.none.mock.calls[0][0]).not.toBeNull()
    })
})