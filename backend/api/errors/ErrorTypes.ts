class LoginError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Loign Error';
    }
}

class InvalidRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidRequest Error"
    }
}

class RegisterError extends Error {
    constructor(message) {
        super(message);
        this.name = "Register"
    }
}

class UsernameNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "UsernameNotFound"
    }
}

export = {
    LoginError,
    InvalidRequestError,
    RegisterError,
    UsernameNotFoundError
}