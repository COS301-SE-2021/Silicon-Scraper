const request = require('supertest');
const app = require('../app');
const mockData = require('../mocks/productMocks');
const repo = require('../products/repo')

repo.pool.query = jest.fn();
repo.fetchData = jest.fn();

describe('incorrect route test', () => {
    it('should return a json object with 404 status and not found message', async () => {
        const res = await request(app)
        .get('/products/');
        expect(res.body).toEqual({
            status: 404,
            error: 'Not found'
        });
    })
})

describe('getProducts test', () => {
    it('should retrieve all products', async () => {
        repo.pool.query.mockResolvedValue(mockData);
    repo.fetchData.mockResolvedValue(mockData);
        const mockRes = {status: 200, products: mockData};
        const res = await request(app)
        .get('/products/getProducts');
        expect(res.body).toEqual(mockRes);
    }) 

    it('should retrieve only 5 products', async () => {
        repo.pool.query.mockResolvedValue(mockData.slice(0,5));
        repo.fetchData.mockResolvedValue(mockData.slice(0,5));
        const mockRes = {status: 200, products: mockData.slice(0,5)};
        const res = await request(app)
        .get('/products/getProducts?limit=5');
        expect(res.body).toEqual(mockRes);
    })

    it('should retrieve products 6 to 10', async () => {
        repo.pool.query.mockResolvedValue(mockData.slice(5,10));
        repo.fetchData.mockResolvedValue(mockData.slice(5,10));
        const mockRes = {status: 200, products: mockData.slice(5,10)};
        const res = await request(app)
        .get('/products/getProducts?page=2&limit=5');
        expect(res.body).toEqual(mockRes);
    })
})

describe('getProductByID test', () => {
    it('should return the product with the specified ID', async () => {
        repo.pool.query.mockResolvedValue(mockData[0]);
        repo.fetchData.mockResolvedValue(mockData[0]);
        const mockRes = {status: 200, products: mockData[0]};
        const res = await request(app)
        .get('/products/getProductByID/1b6d0e22-ca06-414a-80b8-1ca634f29d6e');
        expect(res.body).toEqual(mockRes);
    })

    it('should return empty object as product with id does not exist', async () => {
        repo.pool.query.mockResolvedValue([]);
        repo.fetchData.mockResolvedValue([]);
        const res = await request(app)
        .get('/products/getProductByID/10');
        expect(res.body).toEqual({status: 200, products: []});
    })
})

describe('search test', () => {
    it('should return the products with the specified brand or model, i.e. Nvidia', async () => {
        const mocks = [mockData[2], mockData[9], mockData[15]];
        repo.pool.query.mockResolvedValue(mockData);
        repo.fetchData.mockResolvedValue(mockData);
        const res = await request(app)
        .get('/products/search?key=nvidia');
        expect(res.body).toEqual({status: 200, products: mocks});
    })

    it('should return the products with the specified brand or model but limited to 2, i.e. Nvidia', async () => {
        const mocks = [mockData[2], mockData[9]];
        repo.pool.query.mockResolvedValue(mockData);
        repo.fetchData.mockResolvedValue(mockData);
        const res = await request(app)
        .get('/products/search?key=nvidia&limit=2');
        expect(res.body).toEqual({status: 200, products: mocks});
    })

    it('should return the products with the specified brand or model but limited to 5, i.e. Nvidia', async () => {
        const mocks = [mockData[2], mockData[9], mockData[15]];
        repo.pool.query.mockResolvedValue(mockData);
        repo.fetchData.mockResolvedValue(mockData);
        const res = await request(app)
        .get('/products/search?key=nvidia&page=1&limit=5');
        expect(res.body).toEqual({status: 200, products: mocks});
    })

    it('should return no product since there are no further products, i.e. Nvidia', async () => {
        const mocks = [];
        repo.pool.query.mockResolvedValue(mockData);
        repo.fetchData.mockResolvedValue(mockData);
        const res = await request(app)
        .get('/products/search?key=nvidia&limit=2&page=5');
        expect(res.body).toEqual({status: 200, products: mocks});
    })

    it('should return empty array as brand or model is not found, i.e. Intel', async () => {
        const mocks = [];
        repo.pool.query.mockResolvedValue(mockData);
        repo.fetchData.mockResolvedValue(mockData);
        const res = await request(app)
        .get('/products/search?key=intel');
        expect(res.body).toEqual({status: 200, products: mocks});
    })
})