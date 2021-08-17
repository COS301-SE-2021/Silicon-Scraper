import request from 'supertest';
import app from "../../src/app";
import { mockData } from '../mocks/productMocks';
import fetchData from '../../src/products/repo';

jest.mock('../../src/config')
jest.mock('../../src/products/repo')
jest.mock('pg');
jest.mock('typeorm', () => {
    const actual = jest.requireActual('typeorm');
    return {
        ...actual,
        getRepository: jest.fn()
    }
});
const mockedFetch = fetchData as jest.Mock;

describe('Incorrect route', () => {
    it('should return a json object with 404 status and not found message', async () => {
        const res = await request(app)
        .get('/product/');
        expect(res.body).toEqual({status: 404, error: 'Not Found'})
    })
})

describe('retrieve products', () => {
    it('should retrieve all products i.e. cpus and gpus', async () => {
        mockedFetch.mockReturnValue(mockData)
        const mockRes = {products: mockData};
        const res = await request(app)
        .get('/products/');
        expect(res.body).toEqual(mockRes);
    }) 

    it('should retrieve all products including a watch field indicating if the product is in the user\'s watchlist', async () => {
        const mockedData = mockData.map((x) => {
            x.watch = null;
            return x;
        });
        mockedFetch.mockReturnValue(mockedData);
        const mockRes = mockedData.map((x) => {
            x.watch = false;
            return x;
        })
        const res = await request(app)
        .get('/products?userId=user_id');
        expect(res.body).toEqual({products: mockRes});
    })
})

describe('fetch product by id', () => {
    it('should return the product with the specified ID', async () => {
        mockedFetch.mockReturnValue(mockData[0])
        const mockRes = {products: mockData[0]};
        const res = await request(app)
        .get('/products/id/1b6d0e22-ca06-414a-80b8-1ca634f29d6e');
        expect(res.body).toEqual(mockRes);
    })

    it('should return empty object as product with id does not exist', async () => {
        mockedFetch.mockReturnValue([])
        const res = await request(app)
        .get('/products/id/10');
        expect(res.body).toEqual({products: []});
    })

    it('should return the product with the specified ID and a watch field indicating the product is in the user\'s watchlist', async () => {
        const mockedData = mockData[0];
        mockedData.watch = null;
        mockedFetch.mockReturnValue([mockedData]);
        const mockRes = mockedData;
        mockRes.watch = false;
        const res = await request(app)
        .get('/products/id/1b6d0e22-ca06-414a-80b8-1ca634f29d6e?userId=user_id');
        expect(res.body).toEqual({products: [mockRes]});
    })
})

describe('search for product(s)', () => {
    it('should return the products with the specified brand or model, i.e. Nvidia', async () => {
        const mocks = [mockData[2], mockData[9], mockData[15]];
        mockedFetch.mockReturnValue(mocks)
        const res = await request(app)
        .get('/products/search?key=nvidia');
        expect(res.body).toEqual({products: mocks});
    })

    it('should return the products with the specified brand or model, i.e. ROG Strix', async () => {
        const mocks = [mockData[0], mockData[3], mockData[4], mockData[19]];
        mockedFetch.mockReturnValue(mocks);
        const res = await request(app)
        .get('/products/search?key=ROG Strix');
        expect(res.body).toEqual({products: mocks});
    })

    it('should return the products with the specified brand or model with a watch field indicating whether or not the product is in the user\'s watchlist', async () => {
        const mocks = [mockData[2], mockData[9], mockData[15]];
        mocks.forEach(x => x.watch = null);
        mockedFetch.mockReturnValue(mocks)
        mocks.forEach(x => x.watch = false);
        const res = await request(app)
        .get('/products/search?key=nvidia&userId=user_id');
        expect(res.body).toEqual({products: mocks});
    })

    it('should return empty array as brand or model is not found, i.e. Intel', async () => {
        const mocks = [];
        mockedFetch.mockReturnValue(mocks)
        const res = await request(app)
        .get('/products/search?key=intel');
        expect(res.body).toEqual({products: mocks});
    })
})