import { CreateUserRequest, LoginUserRequest } from "../../src/types/Requests";
import { CreateUserResponse, LoginUserResponse } from "../../src/types/Responses";
import UserService from "../../src/users/service/userService";
import {MockUserRepositoryFactory} from '../../src/mocks/RepositoryFactory';

const mockUserRepositoryFactory: MockUserRepositoryFactory = new MockUserRepositoryFactory();

describe('UserService unit tests', () => {

    it('create a user with valid details', async() => {
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create(false, false)
        );
        let request: CreateUserRequest = {
            username: "test",
            password: "pass"
        };
        const response: CreateUserResponse = await userService.createUser(request);
        expect(response.token).not.toBeNull();
        expect(response.user).not.toBeNull();
        expect(response.user.username).not.toBeNull();
        expect(response.user.hash).not.toBeNull();
        expect(response.user.username).toEqual(request.username);
    });

    it('create user with missing password request property', async() => {
        expect.hasAssertions();
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create(false, true)
        )

        try {
            
            let request: CreateUserRequest = {
                username: "test",
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
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create(false, true)
        )

        try {
            
            let request: CreateUserRequest = {
                username: undefined!,
                password: "pass"
            }
            const response = await userService.createUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('create user with no request properties', async() => {
        expect.hasAssertions();
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create(false, true)
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
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create(false, true)
        )

        try {
            
            let request: CreateUserRequest = {
                username: "test",
                password: "pass"
            }
            const response = await userService.createUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('login user with missing username request property', async() => {
        expect.hasAssertions();
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create(false, true)
        )

        try {
            
            let request: LoginUserRequest = {
                username: undefined!,
                password: "pass"
            }
            const response = await userService.loginUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    it('login user with missing password request property', async() => {
        expect.hasAssertions();
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create(false, true)
        )

        try {
            
            let request: LoginUserRequest = {
                username: "test",
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
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create(false, true)
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
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create(false, true)
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