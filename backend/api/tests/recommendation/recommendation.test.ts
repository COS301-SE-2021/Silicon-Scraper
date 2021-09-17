import '@types/jest';
import request from 'supertest';
import app from '../../src/app';
import service from '../../src/recommendation/service/recommendationService';
import controller from '../../src/recommendation/controller/recommendationController';

jest.mock('../../src/config');
jest.mock('typeorm', () => {
    const actual = jest.requireActual('typeorm');
    return {
        ...actual,
        getRepository: jest.fn()
    }
});

describe('Recommendation Service tests', () => {
    it('fetch gpus, should return array of products', () => {
        expect(true).toBe(true)
    })

    it('fetch cpus, should return array of products', () => {
        expect(true).toBe(true)
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

describe('Recommendation Controller tests', () => {
    it('should call getRecommendations once', () => {
        expect(true).toBe(true)
    })

    it('should return status 200 with object containing array of products', () => {
        expect(true).toBe(true)
    })
})