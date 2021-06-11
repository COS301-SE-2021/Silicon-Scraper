const request = require('supertest');
const app = require('../app');
const mockData = require('../mocks/productMocks');

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
    it('should retrieve all mockData', async () => {
        const res = await request(app)
        .get('/products/getProducts');
        expect(res.body).toEqual(mockData);
    }) 
})

describe('getProductByID test', () => {
    it('should return the mock product with the specified ID', async () => {
        const product = mockData[1];
        const res = await request(app)
        .get('/products/getProductByID/1');
        expect(res.body).toEqual(product);
    })

    it('should return empty object as mock product with id does not exist', async () => {
        const res = await request(app)
        .get('/products/getProductByID/10');
        expect(res.body).toEqual({});
    })

    it('should return empty object as id is not a number', async () => {
        const res = await request(app)
        .get('/products/getProductByID/v');
        expect(res.body).toEqual({});
    })
})

describe('search test', () => {
    it('should return the mock product with the specified brand or model, i.e. Asus', async () => {
        const product = [mockData[5],mockData[6]];
        const res = await request(app)
        .get('/products/search?key=asus');
        expect(res.body).toEqual(product);
    })

    it('should return empty array as brand or model is not in mock products, i.e. Nvidia', async () => {
        const res = await request(app)
        .get('/products/search?key=nvidia');
        expect(res.body).toEqual([]);
    })
})