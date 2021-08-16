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

    // it('should retrieve only 5 products', async () => {
    //     mockedFetch.mockReturnValue(mockData.slice(0,5))
    //     const mockRes = {status: 200, products: mockData.slice(0,5)};
    //     const res = await request(app)
    //     .get('/products/?limit=5');
    //     expect(res.body).toEqual(mockRes);
    // })

    // it('should retrieve products 6 to 10', async () => {
    //     mockedFetch.mockReturnValue(mockData.slice(5,10))
    //     const mockRes = {products: mockData.slice(5,10)};
    //     const res = await request(app)
    //     .get('/products/?page=2&limit=5');
    //     expect(res.body).toEqual(mockRes);
    // })
})

describe('getProductByID test', () => {
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
})

describe('search test', () => {
    it('should return the products with the specified brand or model, i.e. Nvidia', async () => {
        const mocks = [mockData[2], mockData[9], mockData[15]];
        mockedFetch.mockReturnValue(mocks)
        const res = await request(app)
        .get('/products/search?key=nvidia');
        expect(res.body).toEqual({products: mocks});
    })

    it('should return the products with the specified brand or model but limited to 2, i.e. Nvidia', async () => {
        const mocks = [mockData[2], mockData[9]];
        mockedFetch.mockReturnValue(mocks)
        const res = await request(app)
        .get('/products/search?key=nvidia&limit=2');
        expect(res.body).toEqual({products: mocks});
    })

    it('should return the products with the specified brand or model but limited to 5, i.e. Nvidia', async () => {
        const mocks = [mockData[2], mockData[9], mockData[15]];
        mockedFetch.mockReturnValue(mocks)
        const res = await request(app)
        .get('/products/search?key=nvidia&page=1&limit=5');
        expect(res.body).toEqual({products: mocks});
    })

    it('should return no product since there are no further products, i.e. Nvidia', async () => {
        const mocks = [];
        mockedFetch.mockReturnValue(mocks)
        const res = await request(app)
        .get('/products/search?key=nvidia&limit=2&page=5');
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