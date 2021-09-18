import request from 'supertest';
import app from '../../src/app';
import service from '../../src/recommendation/service/recommendationService';

jest.mock('../../src/config');
jest.mock('typeorm', () => {
    const actual = jest.requireActual('typeorm');
    return {
        ...actual,
        getRepository: jest.fn().mockReturnValue({
            createQueryBuilder: jest.fn().mockReturnValue({
                where: jest.fn().mockReturnValue({
                    getMany: jest.fn().mockReturnValue([])
                }),
                innerJoinAndSelect: jest.fn().mockReturnValue({
                    where: jest.fn().mockReturnValue({
                        getMany: jest.fn().mockReturnValue([])
                    })
                }) 
            })
        })
    }
});

describe('Recommendation Service tests', () => {
    it('fetch gpus, should return array of products', async () => {
        const gpus = await service.fetchGPUs([]);
        expect(gpus).toEqual([]);
    })

    it('fetch cpus, should return array of products', async () => {
        const cpus = await service.fetchCPUs([]);
        expect(cpus).toEqual([]);
    })

    it('fetch watchlist cpu, should return onject with array of products', async () => {
        const wl_cpu = await service.fetchWatchlistCPU('');
        expect(wl_cpu).toEqual([]);
    })

    it('fetch watchlist gpu, should return onject with array of products', async () => {
        const wl_gpu = await service.fetchWatchlistGPU('user_id');
        expect(wl_gpu).toEqual([]);
    })

    it('fetch recommendations, should return array of products', async () => {
        const recommendations = await service.fetchRecommendations('user_id');
        expect(recommendations).toEqual([]);
    })

    it('get recommendations, should call fetchRecommendations and return array of products', async () => {
        service.fetchRecommendations = jest.fn().mockReturnValue([]);
        const recommendations = await service.getRecommendations('user_id');
        expect(recommendations).toEqual([]);
    })
})

describe('Recommendation Controller tests', () => {
    service.getRecommendations = jest.fn().mockReturnValue([]);

    it('should call getRecommendations', async () => {
        const response = await request(app).get('/recommendation/user_id');
        expect(service.getRecommendations).toBeCalled();
    })

    it('should return status 200 with object containing array of products', async () => {
        const response = await request(app).get('/recommendation/user_id');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ products: [] });
    })
})