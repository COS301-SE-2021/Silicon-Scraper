import { BadRequest } from "http-errors";

export class RequestError extends BadRequest {

    constructor() {
        super('Missing parameter(s) in request body');
    }
}