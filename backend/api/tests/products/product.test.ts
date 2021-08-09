import { request } from 'supertest';
import app from "../../src/app";

describe('Random test', () => {
    it('Should pass test', () => {
        expect(1).toBe(1);
    })

    it('Should fail', () => {
        expect(false).toBe(true)
    })
})