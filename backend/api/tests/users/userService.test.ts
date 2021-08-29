import { BadRequest, Conflict, Forbidden, NotFound, Unauthorized } from "http-errors";
import { InvalidCredentials, RequestError, UsernameNotFound } from "../../src/types/CustomErrors";
import { CreateUserRequest, LoginUserRequest, RemoveUserRequest } from "../../src/types/Requests";
import { CreateUserResponse, LoginUserResponse } from "../../src/types/Responses";
import UserService from "../../src/users/service/userService";
import {MockUserRepositoryFactory} from '../mocks/RepositoryFactory';

const mockUserRepositoryFactory: MockUserRepositoryFactory = new MockUserRepositoryFactory();

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

describe('Create User unit tests>', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fails when no parameter properties are present', async() => {
        expect.hasAssertions();
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create( false),
            jwt,
            passEnc
        )
        try {
            
            const request: CreateUserRequest = { username: undefined!, password: undefined!};
            const response: CreateUserResponse = await userService.createUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when no username parameter property is present', async() => {
        expect.hasAssertions();
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create( false),
            jwt,
            passEnc
        )
        try {
            
            const request: CreateUserRequest = { username: undefined!, password: 'pass'};
            const response: CreateUserResponse = await userService.createUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when no password parameter property is present', async() => {
        expect.hasAssertions();
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create( false),
            jwt,
            passEnc
        )
        try {
            
            const request: CreateUserRequest = { username: 'test', password: undefined!};
            const response: CreateUserResponse = await userService.createUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when user already exists', async() => {
        expect.hasAssertions();
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create( true),
            jwt,
            passEnc
        )
        try {
            
            const request: CreateUserRequest = { username: 'test', password: 'pass'};
            const response: CreateUserResponse = await userService.createUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Conflict);
        }
    });

    it('successfull creation of user', async() => {
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create( false),
            jwt,
            passEnc
        )
        const request: CreateUserRequest = { username: 'test', password: 'pass'};
        const response: CreateUserResponse = await userService.createUser(request);
        expect(response).not.toBeNull();
        expect(response.token).toEqual('token');
        expect(response.user).not.toBeNull();
        expect(response.user.username).toEqual(request.username);
        expect(response.user.hash).toEqual(request.password);
    });
});

describe('Login User unit tests>', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fails when no parameter properties are present', async() => {
        expect.hasAssertions();
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create( false),
            jwt,
            passEnc
        )
        try {
            
            const request: LoginUserRequest = { username: undefined!, password: undefined!};
            const response: LoginUserResponse = await userService.loginUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when no username parameter property is present', async() => {
        expect.hasAssertions();
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create( false),
            jwt,
            passEnc
        )
        try {
            
            const request: LoginUserRequest = { username: undefined!, password: 'pass'};
            const response: LoginUserResponse = await userService.loginUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when no password parameter property is present', async() => {
        expect.hasAssertions();
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create( false),
            jwt,
            passEnc
        )
        try {
            
            const request: LoginUserRequest = { username: 'test', password: undefined!};
            const response: LoginUserResponse = await userService.loginUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when user doesnt exist', async() => {
        expect.hasAssertions();
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create( false),
            jwt,
            passEnc
        )
        try {
            
            const request: LoginUserRequest = { username: 'test', password: 'pass'};
            const response: LoginUserResponse = await userService.loginUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(NotFound);
        }
    });

    it('fails when passwords dont match', async() => {
        expect.hasAssertions();
        const pse = {
            compare: compFalse
        }
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create( true),
            jwt,
            pse
        )
        try {
            
            const request: LoginUserRequest = { username: 'test', password: 'pass'};
            const response: LoginUserResponse = await userService.loginUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Unauthorized);
        }
    });

    it('successful login of user', async() => {
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create( true),
            jwt,
            passEnc
        )
        const request: LoginUserRequest = {username: 'test', password: 'pass'};
        const response: LoginUserResponse = await userService.loginUser(request);
        expect(response.token).not.toBeNull();
        expect(response.token).toEqual('token');
    });
});

describe('Remove user unit tests>', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fails when no parameter properties are present', async() => {
        expect.hasAssertions();
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create(false),
            jwt,
            passEnc
        )
        try {
            
            const request: RemoveUserRequest = { username: undefined!, password: undefined!};
            await userService.removeUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when no username parameter property is present', async() => {
        expect.hasAssertions();
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create(false),
            jwt,
            passEnc
        )
        try {
            
            const request: RemoveUserRequest = { username: undefined!, password: 'pass'};
            await userService.removeUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when no password parameter property is present', async() => {
        expect.hasAssertions();
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create(false),
            jwt,
            passEnc
        )
        try {
            
            const request: RemoveUserRequest = { username: 'test', password: undefined!};
            await userService.removeUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(BadRequest);
        }
    });

    it('fails when user doesnt exist', async() => {
        expect.hasAssertions();
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create(false),
            jwt,
            passEnc
        )
        try {
            
            const request: RemoveUserRequest = { username: 'test', password: 'pass'};
            await userService.removeUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(NotFound);
        }
    });

    it('fails when password doesnt match', async() => {
        expect.hasAssertions();
        const pse = {
            compare: compFalse
        }
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create(true),
            jwt,
            pse
        )
        try {
            
            const request: RemoveUserRequest = { username: 'test', password: 'pass'};
            await userService.removeUser(request);
        }
        catch (error) {
            expect(error).toBeInstanceOf(Unauthorized);
        }
    });

    it('successful remove of user', async() => {
        expect.assertions(0);
        const userService: UserService = new UserService(
            mockUserRepositoryFactory.create(true),
            jwt,
            passEnc
        )
        const request: RemoveUserRequest = { username: 'test', password: 'pass'};
        await userService.removeUser(request);
    })
});