import { CreateUserRequest, LoginUserRequest } from "../../src/types/Requests";
import { CreateUserResponse, LoginUserResponse } from "../../src/types/Responses";
import UserController from "../../src/users/controller/userController";
import UserService from "../../src/users/service/userService";

type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
}

let createUser = jest.fn(() => new Promise((res, rej) => res({
    token: "token",
    user: "user"
})));
let loginUser = jest.fn(() => new Promise((res, rej) => res({
    token: "token"
})));
const mockUserService: () => MockType<UserService> = jest.fn(() => ({
    createUser: createUser,
    loginUser: loginUser
}));

const userController: UserController = new UserController(
    mockUserService() as unknown as UserService
);

describe('UserController unit tests', () => {

    it('testing signup route function', async() => {
        const request: CreateUserRequest = {
            username: "user",
            password: "test"
        };
        const response: CreateUserResponse = await userController.signUpRoute(request);
        expect(response).not.toBeNull();
        expect(response.token).toEqual("token");
        expect(response.user).toEqual("user");
    });

    it('testing login route function', async() => {
        const request: LoginUserRequest = {
            username: "user",
            password: "test"
        };
        const response: LoginUserResponse = await userController.loginRoute(request);
        expect(response).not.toBeNull();
        expect(response.token).not.toBeNull();
        expect(response.token).toEqual("token");
    })
})