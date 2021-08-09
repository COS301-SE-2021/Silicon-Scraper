import { Repository } from "typeorm"
import { User } from "../../src/entity/user";
import { CreateUserRequest, LoginUserRequest } from "../../src/types/Requests";
import { CreateUserResponse, LoginUserResponse } from "../../src/types/Responses";
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

    it('login user with missing username request property', async() => {
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
            
            let request: LoginUserRequest = {
                username: undefined!,
                password: "password"
            }
            const response = await userService.loginUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('login user with missing password request property', async() => {
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
            
            let request: LoginUserRequest = {
                username: "username",
                password: undefined!
            }
            const response = await userService.loginUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('login user with no request properties', async() => {
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
            
            let request: LoginUserRequest = {
                username: undefined!,
                password: undefined!
            }
            const response = await userService.loginUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('login user that does not exist', async() => {
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
            
            let request: LoginUserRequest = {
                username: undefined!,
                password: undefined!
            }
            const response = await userService.loginUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('login user that exists', async() => {
        // let save = jest.fn(entity => new Promise((res, rej) => res(entity)));
        // let findOne = jest.fn(() => new Promise((res, rej) => res(new User())));
        // const mockUserRepository: () => MockType<Repository<any>> = jest.fn(() => ({
        //     save: save,
        //     findOne: findOne
        // }));
        // const userService: UserService = new UserService(
        //     mockUserRepository() as unknown as Repository<User>
        // )
        // let request: LoginUserRequest = {
        //     username: "Tats",
        //     password: "password"
        // };
        // const response: LoginUserResponse = await userService.loginUser(request);
        // expect(response.token).not.toBeNull();
        // expect(save.call.length).toBe(1);
        // expect(findOne.call.length).toBe(1);
    });
});