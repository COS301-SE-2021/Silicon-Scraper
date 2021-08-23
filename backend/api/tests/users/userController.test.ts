import { BadRequest, Conflict, Forbidden, NotFound, Unauthorized } from "http-errors";
import { InvalidCredentials, RequestError, UsernameNotFound } from "../../src/types/CustomErrors";
import { CreateUserRequest, LoginUserRequest, RemoveUserRequest } from "../../src/types/Requests";
import { CreateUserResponse, LoginUserResponse } from "../../src/types/Responses";
import UserController from "../../src/users/controller/userController";
import UserService from "../../src/users/service/userService";
import {MockType} from '../mocks/MockType';
import { MockUserRepositoryFactory } from "../mocks/RepositoryFactory";

let createUser = jest.fn(() => new Promise((res, rej) => res({
    token: "token",
    user: "user"
})));
let loginUser = jest.fn(() => new Promise((res, rej) => res({
    token: "token"
})));
let removeUser = jest.fn(() => new Promise((res, rej) => res('')));
const mockUserService: () => MockType<UserService> = jest.fn(() => ({
    createUser: createUser,
    loginUser: loginUser,
    removeUser: removeUser
}));

let userController: UserController = new UserController(
    mockUserService() as unknown as UserService
);

describe('UserController unit tests', () => {

    it('testing signup route function', async() => {
        const request: CreateUserRequest = {
            username: "test",
            password: "pass"
        };
        const response: CreateUserResponse = await userController.signUpRoute(request);
        expect(response).not.toBeNull();
        expect(response.token).toEqual("token");
        expect(response.user).toEqual("user");
    });

    it('testing login route function', async() => {
        const request: LoginUserRequest = {
            username: "test",
            password: "pass"
        };
        const response: LoginUserResponse = await userController.loginRoute(request);
        expect(response).not.toBeNull();
        expect(response.token).not.toBeNull();
        expect(response.token).toEqual("token");
    });

    it('testing remove route function', async() => {
        expect.assertions(0);
        const request: RemoveUserRequest = {
            username: 'test',
            password: 'pass'
        };
        await userController.deleteRoute(request);
    });


});

const jwt = {
    generateToken: jest.fn((user) => { return "token"; })
};

const compTrue = jest.fn((pass, hash) => new Promise((res, rej) => { res(true) }));
const compFalse = jest.fn((pass, hash) => new Promise((res, rej) => { res(false) }));
const encPass = jest.fn((password) => new Promise((res, rej) => { return res(password) }));
const passEnc = {
    encode: encPass,
    compare: compTrue
}

let userService: UserService;
const mockUserRepositoryFactory: MockUserRepositoryFactory = new MockUserRepositoryFactory();

describe('UserController signup route integration tests>', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fails when missing properties in param', async() => {
        expect.assertions(1);
        try {
            userService = new UserService(
                mockUserRepositoryFactory.create( false),
                jwt,
                passEnc
            );
            userController = new UserController(userService);
            const request: CreateUserRequest = {username: undefined!, password: undefined!};
            const response: CreateUserResponse = await userController.signUpRoute(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when missing username property in param', async() => {
        expect.assertions(1);
        try {
            userService = new UserService(
                mockUserRepositoryFactory.create( false),
                jwt,
                passEnc
            );
            userController = new UserController(userService);
            const request: CreateUserRequest = {username: undefined!, password: "pass"};
            const response: CreateUserResponse = await userController.signUpRoute(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when missing password property in param', async() => {
        expect.assertions(1);
        try {
            userService = new UserService(
                mockUserRepositoryFactory.create( false),
                jwt,
                passEnc
            );
            userController = new UserController(userService);
            const request: CreateUserRequest = {username: 'test', password: undefined!};
            const response: CreateUserResponse = await userController.signUpRoute(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when user already exists', async() => {
        expect.assertions(1);
        try {
            userService = new UserService(
                mockUserRepositoryFactory.create( true),
                jwt,
                passEnc
            );
            userController = new UserController(userService);
            const request: CreateUserRequest = {username: 'test', password: 'pass'};
            const response: CreateUserResponse = await userController.signUpRoute(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Conflict);
        }
    });


    it('successful signup of user', async() => {
        userService = new UserService(
            mockUserRepositoryFactory.create( false),
            jwt,
            passEnc
        );
        userController = new UserController(userService);
        const request: CreateUserRequest = {username: 'test', password: 'pass'};
        const response: CreateUserResponse = await userController.signUpRoute(request);
        expect(response.token).not.toBeNull();
        expect(response.token).toEqual('token');
        expect(response.user).not.toBeNull();
        expect(response.user.username).toEqual(request.username);
        expect(response.user.hash).toEqual(request.password);
    });

});

describe('UserController login route integration tests>', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fails when missing properties in param', async() => {
        expect.assertions(1);
        try {
            userService = new UserService(
                mockUserRepositoryFactory.create( false),
                jwt,
                passEnc
            );
            userController = new UserController(userService);
            const request: LoginUserRequest = {username: undefined!, password: undefined!};
            const response: LoginUserResponse = await userController.loginRoute(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when missing username property in param', async() => {
        expect.assertions(1);
        try {
            userService = new UserService(
                mockUserRepositoryFactory.create( false),
                jwt,
                passEnc
            );
            userController = new UserController(userService);
            const request: LoginUserRequest = {username: undefined!, password: "pass"};
            const response: LoginUserResponse = await userController.loginRoute(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when missing password property in param', async() => {
        expect.assertions(1);
        try {
            userService = new UserService(
                mockUserRepositoryFactory.create( false),
                jwt,
                passEnc
            );
            userController = new UserController(userService);
            const request: LoginUserRequest = {username: 'test', password: undefined!};
            const response: LoginUserResponse = await userController.loginRoute(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when user doesnt exist', async() => {
        expect.assertions(1);
        try {
            userService = new UserService(
                mockUserRepositoryFactory.create( false),
                jwt,
                passEnc
            );
            userController = new UserController(userService);
            const request: LoginUserRequest = {username: 'test', password: 'pass'};
            const response: LoginUserResponse = await userController.loginRoute(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(NotFound);
        }
    });

    it('fails when passwords dont match', async() => {
        expect.assertions(1);
        const pse = {
            compare: compFalse
        }
        try {
            userService = new UserService(
                mockUserRepositoryFactory.create( true),
                jwt,
                pse
            );
            userController = new UserController(userService);
            const request: LoginUserRequest = {username: 'test', password: 'pass'};
            const response: LoginUserResponse = await userController.loginRoute(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Unauthorized);
        }
    });

    it('successful signup of user', async() => {
        userService = new UserService(
            mockUserRepositoryFactory.create( true),
            jwt,
            passEnc
        );
        userController = new UserController(userService);
        const request: LoginUserRequest = {username: 'test', password: 'pass'};
        const response: LoginUserResponse = await userController.loginRoute(request);
        expect(response.token).not.toBeNull();
        expect(response.token).toEqual('token');
    });
});

describe('UserController delete route integration tests>', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fails when missing properties in param', async() => {
        expect.assertions(1);
        try {
            userService = new UserService(
                mockUserRepositoryFactory.create( false),
                jwt,
                passEnc
            );
            userController = new UserController(userService);
            const request: RemoveUserRequest = {username: undefined!, password: undefined!};
            await userController.deleteRoute(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when missing username property in param', async() => {
        expect.assertions(1);
        try {
            userService = new UserService(
                mockUserRepositoryFactory.create( false),
                jwt,
                passEnc
            );
            userController = new UserController(userService);
            const request: RemoveUserRequest = {username: undefined!, password: undefined!};
            await userController.deleteRoute(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when missing password property in param', async() => {
        expect.assertions(1);
        try {
            userService = new UserService(
                mockUserRepositoryFactory.create( false),
                jwt,
                passEnc
            );
            userController = new UserController(userService);
            const request: RemoveUserRequest = {username: undefined!, password: undefined!};
            await userController.deleteRoute(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when user doesnt exist', async() => {
        expect.assertions(1);
        try {
            userService = new UserService(
                mockUserRepositoryFactory.create( false),
                jwt,
                passEnc
            );
            userController = new UserController(userService);
            const request: RemoveUserRequest = {username: 'test', password: 'pass'};
            await userController.deleteRoute(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(NotFound);
        }
    });

    it('fails when passwords dont match', async() => {
        expect.assertions(1);
        const pse = {
            compare: compFalse
        }
        try {
            userService = new UserService(
                mockUserRepositoryFactory.create( true),
                jwt,
                pse
            );
            userController = new UserController(userService);
            const request: RemoveUserRequest = {username: 'test', password: 'pass'};
            await userController.deleteRoute(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Unauthorized);
        }
    });

    it('successful signup of user', async() => {
        expect.assertions(0);
        userService = new UserService(
            mockUserRepositoryFactory.create( true),
            jwt,
            passEnc
        );
        userController = new UserController(userService);
        const request: RemoveUserRequest = {username: 'test', password: 'pass'};
        await userController.deleteRoute(request);
    });
});
