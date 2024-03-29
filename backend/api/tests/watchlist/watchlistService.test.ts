import { MockCPURepository, MockGPURepository, MockWatchCPURepositoryFactory, MockWatchGPURepositoryFactory } from "../mocks/RepositoryFactory";
import { AddProductRequest, RemoveProductRequest, RetrieveWatchlistRequest } from "../../src/types/Requests";
import { RetrieveWatchlistResponse } from "../../src/types/Responses";
import WatchlistService from "../../src/watchlist/service/watchlistService";
import { ProductNotFound, RequestError } from "../../src/types/CustomErrors";
import { BadRequest, NotFound } from "http-errors";

const mockWatchCPURepositoryFactory: MockWatchCPURepositoryFactory = new MockWatchCPURepositoryFactory();
const mockWatchGPURepositoryFactory: MockWatchGPURepositoryFactory = new MockWatchGPURepositoryFactory();
const mockGPURepository: MockGPURepository = new MockGPURepository();
const mockCPURepository: MockCPURepository = new MockCPURepository();

describe('Add product unit tests', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fails when missing all request properties', async() => {
        expect.hasAssertions();
        const watchlistService: WatchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(false),
            mockGPURepository.create(false)
        )
        try {
            const request: AddProductRequest = {productID: undefined!, userID: undefined!, type: undefined!};
            await watchlistService.addProduct(request);

        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when missing productID request property', async() => {
        expect.hasAssertions();
        const watchlistService: WatchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(false),
            mockGPURepository.create(false)
        )
        try {
            const request: AddProductRequest = {productID: undefined!, userID: 'test', type: 'cpu'};
            await watchlistService.addProduct(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when missing userID request property', async() => {
        expect.hasAssertions();
        const watchlistService: WatchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(false),
            mockGPURepository.create(false)
        )
        try {
            const request: AddProductRequest = {productID: 'test', userID: undefined!, type: 'cpu'};
            await watchlistService.addProduct(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when missing type request property', async() => {
        expect.hasAssertions();
        const watchlistService: WatchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(false),
            mockGPURepository.create(false)
        )
        try {
            const request: AddProductRequest = {productID: 'test', userID: 'test', type: undefined!};
            await watchlistService.addProduct(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails with invalid type property', async() => {
        expect.hasAssertions();
        const watchlistService: WatchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(false),
            mockGPURepository.create(false)
        )
        try {
            const request: AddProductRequest = {productID: 'test', userID: 'test', type: 'woo'};
            await watchlistService.addProduct(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when cpu doesnt exist', async() => {
        expect.hasAssertions();
        const watchlistService: WatchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(false),
            mockGPURepository.create(true)
        )
        try {
            const request: AddProductRequest = {productID: 'test', userID: 'test', type: 'cPu'};
            await watchlistService.addProduct(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(NotFound);
        }
    });

    it('fails when gpu doesnt exist', async() => {
        expect.hasAssertions();
        const watchlistService: WatchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(true),
            mockGPURepository.create(false)
        )
        try {
            const request: AddProductRequest = {productID: 'test', userID: 'test', type: 'GPu'};
            await watchlistService.addProduct(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(NotFound);
        }
    });

    it('sucessful adding of a cpu', async() => {
        const watchlistService: WatchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(true),
            mockGPURepository.create(false)
        )
        const request: AddProductRequest = {productID: 'test', userID: 'test', type: 'Cpu'};
        await watchlistService.addProduct(request);
    });

    it('successful adding of a gpu', async() => {
        const watchlistService: WatchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(false),
            mockGPURepository.create(true)
        )
        const request: AddProductRequest = {productID: 'test', userID: 'test', type: 'Gpu'};
        await watchlistService.addProduct(request);
    });
});

describe('Retrieve watchlist unit tests', () => {

    it('fails when missing all request properties', async() => {
        expect.hasAssertions();
        const watchlistService: WatchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(false),
            mockGPURepository.create(false)
        )
        try {
            const request: RetrieveWatchlistRequest = {userID: undefined!};
            const response: RetrieveWatchlistResponse = await watchlistService.retrieveWatchlist(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    // it('successful retrievel of user"s watchlist', async() => {
    //     const watchlistService: WatchlistService = new WatchlistService(
    //         mockWatchGPURepositoryFactory.create(false),
    //         mockWatchCPURepositoryFactory.create(false),
    //         mockCPURepository.create(false),
    //         mockGPURepository.create(false)
    //     )
    //     const request: RetrieveWatchlistRequest = {userID: 'test'};
    //     const response: RetrieveWatchlistResponse = await watchlistService.retrieveWatchlist(request);
    //     expect(response.products).not.toBeNull();
    //     expect(response.products.length).toBe(2);
    //     expect(response.products[0]).not.toBeNull();
    //     expect(response.products[1]).not.toBeNull();
    // });
});

describe('Remove product (from watchlist) unit tests', () => {

    it('fails when missing all request properties', async() => {
        expect.hasAssertions();
        const watchlistService: WatchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(false),
            mockGPURepository.create(false)
        )
        try {
            const request: RemoveProductRequest = {productID: undefined!, userID: undefined!, type: undefined!};
            await watchlistService.removeProduct(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when missing productID request properties', async() => {
        expect.hasAssertions();
        const watchlistService: WatchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(false),
            mockGPURepository.create(false)
        )
        try {
            const request: RemoveProductRequest = {productID: undefined!, userID: 'test', type: 'cpu'};
            await watchlistService.removeProduct(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when missing userID request properties', async() => {
        expect.hasAssertions();
        const watchlistService: WatchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(false),
            mockGPURepository.create(false)
        )
        try {
            const request: RemoveProductRequest = {productID: 'test', userID: undefined!, type: 'cpu'};
            await watchlistService.removeProduct(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when missing type request properties', async() => {
        expect.hasAssertions();
        const watchlistService: WatchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(false),
            mockGPURepository.create(false)
        )
        try {
            const request: RemoveProductRequest = {productID: 'test', userID: 'test', type: undefined!};
            await watchlistService.removeProduct(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails with invalid type property', async() => {
        expect.hasAssertions();
        const watchlistService: WatchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(false),
            mockGPURepository.create(false)
        )
        try {
            const request: RemoveProductRequest = {productID: 'test', userID: 'test', type: 'woo'};
            await watchlistService.removeProduct(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('successful removal of a cpu', async() => {
        const watchlistService: WatchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(false),
            mockGPURepository.create(false)
        )
        const request: RemoveProductRequest = {productID: 'test', userID: 'test', type: 'cPu'};
        await watchlistService.removeProduct(request);
    });

    it('successful removal of a gpu', async() => {
        const watchlistService: WatchlistService = new WatchlistService(
            mockWatchGPURepositoryFactory.create(false),
            mockWatchCPURepositoryFactory.create(false),
            mockCPURepository.create(false),
            mockGPURepository.create(false)
        )
        const request: RemoveProductRequest = {productID: 'test', userID: 'test', type: 'GPu'};
        await watchlistService.removeProduct(request);
    });
});