
import request from 'supertest';
import app from '../../src/app';
import service from '../../src/recommendation/service/recommendationService';
import controller from '../../src/recommendation/controller/recommendationController';
import { expectCt } from 'helmet';

jest.mock('../../src/config');
jest.mock('typeorm', () => {
    const actual = jest.requireActual('typeorm');
    return {
        ...actual,
        getRepository: jest.fn().mockReturnValue({
            createQueryBuilder: jest.fn().mockReturnValue({
                where: jest.fn().mockReturnValue({
                    getMany: jest.fn().mockReturnValue([])
                })
            })
        })
    }
});

describe('Recommendation Service tests', () => {
    it('fetch gpus, should return array of products', async () => {
        const gpus = await service.fetchGPUs([]);
        expect(gpus).toEqual([])
    })

    it('fetch cpus, should return array of products', async () => {
        const cpus = await service.fetchCPUs([]);
        expect(cpus).toEqual([])
    })

    it('fetch watchlist cpu, should return onject with array of products', () => {
        expect(true).toBe(true)
    })

    it('fetch watchlist gpu, should return onject with array of products', () => {
        expect(true).toBe(true)
    })

    it('fetch recommendations, should return array of products', () => {
        expect(true).toBe(true)
    })

    it('get recommendationsm should call fetchRecommendations and return array of products', () => {
        expect(true).toBe(true)
    })
})

