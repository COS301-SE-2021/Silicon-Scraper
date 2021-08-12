import { BadRequest, NotFound, Unauthorized } from "http-errors";

export class RequestError extends BadRequest {

    constructor(message?: string) {
        super(message || 'Missing parameter(s) in request body');
    }
}

export class UsernameNotFound extends NotFound {
    constructor() {
        super('Username not found');
    }
}

export class ProductNotFound extends NotFound {
    constructor() {
        super('Product not found');
    }
}

export class InvalidCredentials extends Unauthorized {
    constructor() {
        super('Invalid credentials provided');
    }
}