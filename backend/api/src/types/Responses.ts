import { CPU } from "../entity/cpu";
import { GPU } from "../entity/gpu";
import { User } from "../entity/user";

export interface CreateUserResponse {
    token: string,
    user: User
}

export interface LoginUserResponse {
    token: string
}

export interface RetrieveWatchlistResponse {
    products: any[]
}