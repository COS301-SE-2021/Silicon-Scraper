import { Repository } from "typeorm";
import { User } from "../../entity/user";
import { RequestError } from "../../types/CustomErrors";
import { CreateUserRequest, LoginUserRequest, RemoveUserRequest } from "../../types/Requests";
import { CreateUserResponse, LoginUserResponse } from "../../types/Responses";

export default class UserService {

    constructor(
        private readonly userRepository: Repository<User>,
        private readonly jwtUtil: any,
        private readonly passEnc: any
        ) {}

    async createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
        if (request.username === undefined || request.password === undefined)
            throw new RequestError();
        let existingUser: User | undefined = await this.userRepository.findOne({
            where: {
                username: request.username
            }
        });
        if (existingUser !== undefined)
            throw new Error('Username already exists');
        const passwordHash = await this.passEnc.encode(request.password);
        const user: User = new User();
        user.username = request.username;
        user.hash = passwordHash;
        const result: User = await this.userRepository.save(user);
        result.hash = request.password;
        const response: CreateUserResponse = <CreateUserResponse>{};
        response.token = this.jwtUtil.generateToken(user);
        response.user = result;
        return response;
    }

    async loginUser(request: LoginUserRequest): Promise<LoginUserResponse> {
        if (request.username === undefined || request.password === undefined)
            throw new RequestError();
        let user: User | undefined = await this.userRepository.findOne({
            where: {
                username: request.username
            }
        });
        if (user === undefined)
            throw new Error('Username does not exist');
        let result = await this.passEnc.compare(request.password, user.hash);
        if (result === false)
            throw new Error('Invalid login details');
        const response: LoginUserResponse = <LoginUserResponse>{};
        response.token = this.jwtUtil.generateToken(user);
        return response;
    }

    async removeUser(request: RemoveUserRequest): Promise<void> {
        if (request.username === undefined || request.password === undefined)
            throw new RequestError();
        let user: User | undefined = await this.userRepository.findOne({
            where: {
                username: request.username
            }
        });
        if (user === undefined)
            throw new Error('Username does not exist');
        let result = await this.passEnc.compare(request.password, user.hash);
        if (result === false)
            throw new Error('Invalid details provided');
    }

}