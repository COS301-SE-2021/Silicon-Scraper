import { Repository } from "typeorm"
import { User } from "../../src/entity/user";
import { CreateUserRequest } from "../../src/types/Requests";
import { CreateUserResponse } from "../../src/types/Responses";
import UserService from "../../src/users/service/userService";

type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
}

describe('UserService unit tests', () => {

    it('create a user with valid details', async() => {
        let save = jest.fn(entity => new Promise((res, rej) => res(entity)));
        let findOne = jest.fn(() => new Promise((res, rej) => res(undefined)));
        const mockUserRepository: () => MockType<Repository<any>> = jest.fn(() => ({
            save: save,
            findOne: findOne
        }));
        const userService: UserService = new UserService(
            mockUserRepository() as unknown as Repository<User>
        )
        let request: CreateUserRequest = {
            username: "Tats",
            password: "password"
        };
        const response: CreateUserResponse = await userService.createUser(request);
        expect(response.token).not.toBeNull();
        expect(response.user).not.toBeNull();
        expect(response.user.username).not.toBeNull();
        expect(response.user.hash).not.toBeNull();
        expect(response.user.username).toEqual(request.username);
        expect(save.call.length).toBe(1);
        expect(findOne.call.length).toBe(1);
    });

    it('create user with missing password request property', async() => {
        expect.hasAssertions();

        let save = jest.fn(entity => new Promise((res, rej) => res(entity)));
        let findOne = jest.fn(() => new Promise((res, rej) => res(new User())));
        const mockUserRepository: () => MockType<Repository<any>> = jest.fn(() => ({
            save: save,
            findOne: findOne
        }));
        const userService: UserService = new UserService(
            mockUserRepository() as unknown as Repository<User>
        )

        try {
            
            let request: CreateUserRequest = {
                username: "Tats",
                password: undefined!
            }
            const response = await userService.createUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('create user with missing username request property', async() => {
        expect.hasAssertions();

        let save = jest.fn(entity => new Promise((res, rej) => res(entity)));
        let findOne = jest.fn(() => new Promise((res, rej) => res(new User())));
        const mockUserRepository: () => MockType<Repository<any>> = jest.fn(() => ({
            save: save,
            findOne: findOne
        }));
        const userService: UserService = new UserService(
            mockUserRepository() as unknown as Repository<User>
        )

        try {
            
            let request: CreateUserRequest = {
                username: undefined!,
                password: "password"
            }
            const response = await userService.createUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('create user with no request properties', async() => {
        expect.hasAssertions();

        let save = jest.fn(entity => new Promise((res, rej) => res(entity)));
        let findOne = jest.fn(() => new Promise((res, rej) => res(new User())));
        const mockUserRepository: () => MockType<Repository<any>> = jest.fn(() => ({
            save: save,
            findOne: findOne
        }));
        const userService: UserService = new UserService(
            mockUserRepository() as unknown as Repository<User>
        )

        try {
            
            let request: CreateUserRequest = {
                username: undefined!,
                password: undefined!
            }
            const response = await userService.createUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('create user that already exists', async() => {
        expect.hasAssertions();

        let save = jest.fn(entity => new Promise((res, rej) => res(entity)));
        let findOne = jest.fn(() => new Promise((res, rej) => res(new User())));
        const mockUserRepository: () => MockType<Repository<any>> = jest.fn(() => ({
            save: save,
            findOne: findOne
        }));
        const userService: UserService = new UserService(
            mockUserRepository() as unknown as Repository<User>
        )

        try {
            
            let request: CreateUserRequest = {
                username: "Tats",
                password: "password"
            }
            const response = await userService.createUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });
})

// describe('register', () => {

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     it('missing request properties', async() => {
//         const request = {}
//         expect(true).toBe(true)
//     })

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
    
//});

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