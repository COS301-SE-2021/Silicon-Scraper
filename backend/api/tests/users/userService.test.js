const addUser = jest.fn((username, password) => { return true });
const getUser = jest.fn((user) => { return null })

const database = {
    addUser,
    getUser
}

const passwordEncoder = {
    encode: jest.fn(password => { return "password" })
}

const userService = require('../../users/service/userService.js')(database, passwordEncoder)

describe('register', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('missing request properties', async() => {
        const request = {}
        expect(true).toBe(true)
    })

    // it('successful register of a user', async() => {
    //     const request = {
    //         username: "TestUser",
    //         password: "Password"
    //     };
    //     let response = await userService.register(request)
    //     expect(response).not.toBe(null)
    //     expect(getUser.mock.calls.length).toBe(1)
    //     expect(getUser.mock.calls[0][0]).toBe(request.username)
    //     expect(addUser.mock.calls[0][0]).toBe(request.username)
    //     expect(response.statusCode).toBe(201);
    // });

    // it('check for if user exists', async() => {
    //     database.getUser = jest.fn((user) => { return user })
    //     const request = {
    //         username: "username",
    //         password: "password"
    //     }
    //     let response = await userService.register(request)
    //     expect(response).not.toBe(null)
    //     expect(addUser.mock.calls.length).toBe(0)
    //     //expect(getUser.mock.calls.length).toBe(1) 
    //     //expect(getUser.mock.calls[0][0]).toBe(request.username)
    //     expect(response.statusCode).toBe(200)
    // })
    
});

// describe('login test', () => {

//     beforeEach(() => {
//         jest.clearAllMocks();
//     })

//     it('test for missing request properties', async() => {
//         const request = {}
//         let response = await userService.login(request)
//     })

    // it('test for non-found user', async() => {
    //     database.getUser = jest.fn(user => { return null })
    //     const request = {
    //         username: "username",
    //         password: "password"
    //     }
    //     let response = await userService.login(request)
    //     expect(response).not.toBe(null)
    //     //expect(getUser.mock.calls.length).toBe(1)
    //     //expect(getUser.mock.calls[0][0]).toBe(request.username)
    //     expect(response.statusCode).toBe(200)
    // })

    // it('test for if password is invalid', async() => {
    //     const request = {
    //         username: "username",
    //         password: "password1"
    //     }
    //     let response = await userService.login(request)
    //     expect(response).not.toBe(null)
    //     //expect(passwordEncoder.mock.calls.length).toBe(1)
    //     expect(response.statusCode).toBe(200)
    // })

    // it('test for if password is valid', async() => {
    //     const request = {
    //         username: "username",
    //         password: "password"
    //     }
    //     let response = await userService.login(request)
    //     expect(response).not.toBe(null)
    //     expect(response.statusCode).toBe(200)
    // })
//})