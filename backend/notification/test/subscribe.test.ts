/**
 * Integration tests
 * Test subscribe route for notification server
 */

import request from 'supertest';
import { app } from '../src/app';

// mock Listener class
jest.mock('../src/firebase/firebase.initialise');
jest.mock('pg');
jest.mock('../src/listener/listener');
jest.mock('typeorm', () => {
    const actual = jest.requireActual('typeorm');
    return {
        ...actual,
        getRepository: jest.fn().mockReturnValue({
            createQueryBuilder: jest.fn().mockImplementation(() => ({
                where: jest.fn().mockImplementation(() => ({
                    getOne: jest.fn().mockReturnValue(false)
                })),
            })),
            save: jest.fn().mockImplementation(() => {})
        }),
    }
});

describe('subscribe route response', () => {
    it('should return object with a status of 200', async () => {
        const response = await request(app).post('/subscribe').send({userId: '1', token: '1'});
        expect(response.body).toEqual({status: 200});
    });

    it('should return object with status of 400 because one or more fields are missing', async () => {
        const response = await request(app).post('/subscribe').send({token: '1'});
        expect(response.body).toEqual({status: 400});
    });
});