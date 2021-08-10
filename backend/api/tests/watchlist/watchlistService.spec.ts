import { MockCPURepository, MockGPURepository, MockWatchCPURepositoryFactory, MockWatchGPURepositoryFactory } from "../../src/mocks/RepositoryFactory";
import { AddProductRequest } from "../../src/types/Requests";
import WatchlistService from "../../src/watchlist/service/watchlistService";

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
            expect(error).toBeInstanceOf(Error);
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
            expect(error).toBeInstanceOf(Error);
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
            expect(error).toBeInstanceOf(Error);
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
            expect(error).toBeInstanceOf(Error);
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
            expect(error).toBeInstanceOf(Error);
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
            expect(error).toBeInstanceOf(Error);
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
            expect(error).toBeInstanceOf(Error);
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

    //it('')
});