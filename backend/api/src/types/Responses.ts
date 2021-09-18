import { CPU } from "../entity/cpu";
import { GPU } from "../entity/gpu";
import { User } from "../entity/user";

export interface CreateUserResponse {
    token: string,
    user: Partial<User>
}

export interface LoginUserResponse {
    token: string,
    user: Partial<User>
}

export interface RetrieveWatchlistResponse {
    products: any[]
}

export interface RetrieveSentimentResponse {
    sentiments: {}
}