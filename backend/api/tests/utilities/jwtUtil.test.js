const jwtUtil = require('../../utilities/jwtUtil.js');

describe('token test', () => {

    const headers = {}
    const request = {
        headers 
    }
    const response = {
        status: jest.fn()
    }
    const next = jest.fn()

    beforeEach(() => {
        response.status = jest.fn()
    })

    it('testing that a jwt token is generated', async() => {
        const user = {};
        const jwtToken = jwtUtil.generateToken(user);
        expect(jwtToken).not.toBe(null);
    })

    it('testing that function should abort when no auth header is present', async() => {
        jwtUtil.verifyToken(request, response, next)
        expect(response.status.mock.calls.length).toBe(1)
        expect(response.status.mock.calls[0][0]).toBe(403)
    })

    it('testing that function should abort when token has no Bearer tag', async() => {
        request.headers.authorization = "randomstring"
        jwtUtil.verifyToken(request, response, next)
        expect(response.status.mock.calls.length).toBe(1)
        expect(response.status.mock.calls[0][0]).toBe(403)
    })
})