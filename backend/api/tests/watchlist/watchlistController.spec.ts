import { MockType } from '../../src/mocks/MockType';
import WatchlistService from '../../src/watchlist/service/watchlistService';
import WatchlistController from '../../src/watchlist/controller/watchlistController';
import { MockUserRepositoryFactory } from '../../src/mocks/RepositoryFactory';
import { AddProductRequest, RemoveProductRequest, RetrieveWatchlistRequest } from '../../src/types/Requests';
import UserController from '../../src/users/controller/userController';
import { RetrieveWatchlistResponse } from '../../src/types/Responses';

let addToWatchlist = jest.fn((request) => new Promise((res, rej) => res('woo')));
const emptyWList: any[] = [];
const fullWList: any[] = ['a', 'b', 'c'];
let getWatchlist = jest.fn((request) => new Promise((res, rej) => res({products: fullWList})));
let removeFromWatchlist = jest.fn((request) => new Promise((res, rej) => res('woo')));

const mockWatchlistService: () => MockType<WatchlistService> = jest.fn(() => ({
    addProduct: addToWatchlist,
    retrieveWatchlist: getWatchlist,
    removeProduct: removeFromWatchlist,
}));

let watchlistController: WatchlistController = new WatchlistController(
    mockWatchlistService() as unknown as WatchlistService
)

describe('WatchlistController unit tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('testing add to watchlist route', async() => {
        const request: AddProductRequest = {
            userID: 'test',
            productID: 'test',
            type: 'cpu'
        };
        await watchlistController.addToWatchlist(request);
        expect(addToWatchlist.call.length).toBe(1);
    });

    it('testing get to watchlist route', async() => {
        const request: RetrieveWatchlistRequest = {
            userID: 'test'
        };
        const response: RetrieveWatchlistResponse = await watchlistController.getWatchlist(request);
        expect(response.products).not.toBeNull();
        expect(response.products.length).toBe(3);
        expect(getWatchlist.call.length).toBe(1);
    });

    it('testing remove from watchlist route', async() => {
        const request: RemoveProductRequest = {
            userID: 'test',
            productID: 'test',
            type: 'cpu'
        };
        await watchlistController.removeFromWatchlist(request);
        expect(removeFromWatchlist.call.length).toBe(1);
    });
});