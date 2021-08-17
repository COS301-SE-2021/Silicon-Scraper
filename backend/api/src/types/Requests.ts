export interface CreateUserRequest {
    username: string,
    password: string
}

export interface LoginUserRequest {
    username: string,
    password: string
}

export interface RemoveUserRequest {
    username: string,
    password: string
}

export interface AddProductRequest {
    type: string,
    productID: string,
    userID: string
}

export interface RetrieveWatchlistRequest {
    userID: string
}

export interface RemoveProductRequest {
    userID: string,
    productID: string,
    type: string
}