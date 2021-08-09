import { User } from "../entity/user";

export interface CreateUserResponse {
    token: string,
    user: User
}

export interface LoginUserResponse {
    token: string
}