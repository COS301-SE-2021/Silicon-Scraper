/**
 * Test database listener
 */
import Listener from '../src/listener/listener';
import { Client } from 'pg';

jest.mock('pg', () => {
    const mockClient = {
        connect: jest.fn(),
        query: jest.fn(),
        on : jest.fn()
    }
    return {
        Client: jest.fn(() => { return mockClient})
    }
});

describe('Listener unit tests', () => {
    const client = new Client();
    const listener = new Listener();
    
    it('should call connect', () => {
        expect(client.connect).toHaveBeenCalled()
    })

    it('should call query', () => {
        expect(client.query).toHaveBeenCalled()
    })
})