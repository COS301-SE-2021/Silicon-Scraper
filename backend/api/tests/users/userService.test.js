const addUser = jest.fn((username, password) => { return true });
const getUser = jest.fn((user) => { return null })

const database = {
    addUser,
    getUser,
    hello: 5
}

const passwordEncoder = {
    encode: jest.fn()
}

const UserService = require('../../users/service/userService.js');
const userService = new UserService(database, passwordEncoder);

describe('register', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('missing request properties', async() => {
        const request = {}
        let response = await userService.register(request)
        expect(response).not.toBe(null)
        expect(getUser.mock.calls.length).toBe(0)
        expect(addUser.mock.calls.length).toBe(0)
        expect(response.statusCode).toBe(400)
    })

    it('successful register of a user', async() => {
        const request = {
            username: "TestUser",
            password: "Password"
        };
        let response = await userService.register(request)
        expect(response).not.toBe(null)
        expect(getUser.mock.calls.length).toBe(1)
        expect(getUser.mock.calls[0][0]).toBe(request.username)
        expect(addUser.mock.calls[0][0]).toBe(request.username)
        expect(response.statusCode).toBe(201);
    });

    it('check for if user exists', async() => {
        database.getUser = jest.fn((user) => { return user })
        const request = {
            username: "username",
            password: "password"
        }
        let response = await userService.register(request)
        expect(response).not.toBe(null)
        expect(addUser.mock.calls.length).toBe(0)
        //expect(getUser.mock.calls.length).toBe(1) 
        //expect(getUser.mock.calls[0][0]).toBe(request.username)
        expect(response.statusCode).toBe(200)
    })
    
});
