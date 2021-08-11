import { MockType } from '../mocks/MockType';
import WatchlistService from '../../src/watchlist/service/watchlistService';
import WatchlistController from '../../src/watchlist/controller/watchlistController';
import { MockCPURepository, MockGPURepository, MockUserRepositoryFactory, MockWatchCPURepositoryFactory, MockWatchGPURepositoryFactory } from '../mocks/RepositoryFactory';
import { AddProductRequest, RemoveProductRequest, RetrieveWatchlistRequest } from '../../src/types/Requests';
import UserController from '../../src/users/controller/userController';
import { RetrieveWatchlistResponse } from '../../src/types/Responses';
import { request } from 'express';

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

let watchlistService: WatchlistService;
const mockCPURepository: MockCPURepository = new MockCPURepository();
const mockGPURepository: MockGPURepository = new MockGPURepository();
const mockWatchCPURepositoryFactory: MockWatchCPURepositoryFactory = new MockWatchCPURepositoryFactory();
const mockWatchGPURepositoryFactory: MockWatchGPURepositoryFactory = new MockWatchGPURepositoryFactory();

describe('WatchlistController add to watchlist route integration tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fails when missing all properties in param object', async() => {
        expect.hasAssertions();
        try {
            watchlistService = new WatchlistService(
                mockWatchGPURepositoryFactory.create(false),
                mockWatchCPURepositoryFactory.create(false),
                mockCPURepository.create(false),
                mockGPURepository.create(false)
            );
            watchlistController = new WatchlistController(watchlistService);
            const request: AddProductRequest = {productID: undefined!, userID: undefined!, type: undefined!};
            await watchlistController.addToWatchlist(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('fails when missing productID property in param object', async() => {
        expect.hasAssertions();
        try {
            watchlistService = new WatchlistService(
                mockWatchGPURepositoryFactory.create(false),
                mockWatchCPURepositoryFactory.create(false),
                mockCPURepository.create(true),
                mockGPURepository.create(true)
            );
            watchlistController = new WatchlistController(watchlistService);
            const request: AddProductRequest = {productID: undefined!, userID: 'test', type: 'cpu'};
            await watchlistController.addToWatchlist(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('fails when missing userID property in param object', async() => {
        expect.hasAssertions();
        try {
            watchlistService = new WatchlistService(
                mockWatchGPURepositoryFactory.create(false),
                mockWatchCPURepositoryFactory.create(false),
                mockCPURepository.create(true),
                mockGPURepository.create(true)
            );
            watchlistController = new WatchlistController(watchlistService);
            const request: AddProductRequest = {productID: 'test', userID: undefined!, type: 'cpu'};
            await watchlistController.addToWatchlist(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('fails when missing type property in param object', async() => {
        expect.hasAssertions();
        try {
            watchlistService = new WatchlistService(
                mockWatchGPURepositoryFactory.create(false),
                mockWatchCPURepositoryFactory.create(false),
                mockCPURepository.create(true),
                mockGPURepository.create(true)
            );
            watchlistController = new WatchlistController(watchlistService);
            const request: AddProductRequest = {productID: 'test', userID: 'test', type: undefined!};
            await watchlistController.addToWatchlist(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('fails when providing invalid type', async() => {
        expect.hasAssertions();
        try {
            watchlistService = new WatchlistService(
                mockWatchGPURepositoryFactory.create(false),
                mockWatchCPURepositoryFactory.create(false),
                mockCPURepository.create(true),
                mockGPURepository.create(true)
            );
            watchlistController = new WatchlistController(watchlistService);
            const request: AddProductRequest = {productID: 'test', userID: 'test', type: 'test'};
            await watchlistController.addToWatchlist(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('fails when cpu doesnt exist', async() => {
        expect.hasAssertions();
        try {
            watchlistService = new WatchlistService(
                mockWatchGPURepositoryFactory.create(false),
                mockWatchCPURepositoryFactory.create(false),
                mockCPURepository.create(false),
                mockGPURepository.create(true)
            );
            watchlistController = new WatchlistController(watchlistService);
            const request: AddProductRequest = {productID: 'test', userID: 'test', type: 'cpu'};
            await watchlistController.addToWatchlist(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('fails when gpu doesnt exist', async() => {
        expect.hasAssertions();
        try {
            watchlistService = new WatchlistService(
                mockWatchGPURepositoryFactory.create(false),
                mockWatchCPURepositoryFactory.create(false),
                mockCPURepository.create(true),
                mockGPURepository.create(false)
            );
            watchlistController = new WatchlistController(watchlistService);
            const request: AddProductRequest = {productID: 'test', userID: 'test', type: 'gpu'};
            await watchlistController.addToWatchlist(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('successful adding of a cpu', async() => {
        watchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(true),
            mockGPURepository.create(false)
        );
        watchlistController = new WatchlistController(watchlistService);
        const request: AddProductRequest = {productID: 'test', userID: 'test', type: 'cpu'};
        await watchlistController.addToWatchlist(request);
    });

    it('sucessful adding of a gpu', async() => {
        watchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(false),
            mockGPURepository.create(true)
        );
        watchlistController = new WatchlistController(watchlistService);
        const request: AddProductRequest = {productID: 'test', userID: 'test', type: 'gpu'};
        await watchlistController.addToWatchlist(request);
    });
});

describe('WatchlistController get watchlist route integration tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fails when missing all request properties', async() => {
        expect.hasAssertions();
        try {
            watchlistService = new WatchlistService(
                mockWatchGPURepositoryFactory.create(false),
                mockWatchCPURepositoryFactory.create(false),
                mockCPURepository.create(false),
                mockGPURepository.create(true)
            );
            watchlistController = new WatchlistController(watchlistService);
            const request: RetrieveWatchlistRequest = {userID: undefined!};
            const response: RetrieveWatchlistResponse = await watchlistController.getWatchlist(request);
        }
        catch(error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    // it('successful retrievel of user"s watchlist', async() => {
    //     watchlistService = new WatchlistService(
    //         mockWatchGPURepositoryFactory.create(false),
    //         mockWatchCPURepositoryFactory.create(false),
    //         mockCPURepository.create(false),
    //         mockGPURepository.create(true)
    //     );
    //     watchlistController = new WatchlistController(watchlistService);
    //     const request: RetrieveWatchlistRequest = {userID: 'test'};
    //     const response: RetrieveWatchlistResponse = await watchlistController.getWatchlist(request);
    //     expect(response.products).not.toBeNull();
    //     expect(response.products.length).toBe(2);
    //     expect(response.products[0]).not.toBeNull();
    //     expect(response.products[1]).not.toBeNull();

    // });
});

describe('WatchlistController remove route integration test', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fails when missing all properties in param object', async() => {
        expect.hasAssertions();
        try {
            watchlistService = new WatchlistService(
                mockWatchGPURepositoryFactory.create(false),
                mockWatchCPURepositoryFactory.create(false),
                mockCPURepository.create(false),
                mockGPURepository.create(false)
            );
            watchlistController = new WatchlistController(watchlistService);
            const request: RemoveProductRequest = {productID: undefined!, userID: undefined!, type: undefined!};
            await watchlistController.removeFromWatchlist(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('fails when missing productID property in param object', async() => {
        expect.hasAssertions();
        try {
            watchlistService = new WatchlistService(
                mockWatchGPURepositoryFactory.create(false),
                mockWatchCPURepositoryFactory.create(false),
                mockCPURepository.create(true),
                mockGPURepository.create(true)
            );
            watchlistController = new WatchlistController(watchlistService);
            const request: RemoveProductRequest = {productID: undefined!, userID: 'test', type: 'cpu'};
            await watchlistController.removeFromWatchlist(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('fails when missing userID property in param object', async() => {
        expect.hasAssertions();
        try {
            watchlistService = new WatchlistService(
                mockWatchGPURepositoryFactory.create(false),
                mockWatchCPURepositoryFactory.create(false),
                mockCPURepository.create(true),
                mockGPURepository.create(true)
            );
            watchlistController = new WatchlistController(watchlistService);
            const request: RemoveProductRequest = {productID: 'test', userID: undefined!, type: 'cpu'};
            await watchlistController.removeFromWatchlist(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('fails when missing type property in param object', async() => {
        expect.hasAssertions();
        try {
            watchlistService = new WatchlistService(
                mockWatchGPURepositoryFactory.create(false),
                mockWatchCPURepositoryFactory.create(false),
                mockCPURepository.create(true),
                mockGPURepository.create(true)
            );
            watchlistController = new WatchlistController(watchlistService);
            const request: RemoveProductRequest = {productID: 'test', userID: 'test', type: undefined!};
            await watchlistController.removeFromWatchlist(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('fails when providing invalid type', async() => {
        expect.hasAssertions();
        try {
            watchlistService = new WatchlistService(
                mockWatchGPURepositoryFactory.create(false),
                mockWatchCPURepositoryFactory.create(false),
                mockCPURepository.create(true),
                mockGPURepository.create(true)
            );
            watchlistController = new WatchlistController(watchlistService);
            const request: RemoveProductRequest = {productID: 'test', userID: 'test', type: 'test'};
            await watchlistController.removeFromWatchlist(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('successful removal of a product', async() => {
        watchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(true),
            mockGPURepository.create(true)
        );
        watchlistController = new WatchlistController(watchlistService);
        const request: RemoveProductRequest = {productID: 'test', userID: 'test', type: 'cpu'};
        await watchlistController.removeFromWatchlist(request);
    });

    it('successful removal of a gpu', async() => {
        watchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(true),
            mockGPURepository.create(true)
        );
        watchlistController = new WatchlistController(watchlistService);
        const request: RemoveProductRequest = {productID: 'test', userID: 'test', type: 'gpu'};
        await watchlistController.removeFromWatchlist(request);
    });
});