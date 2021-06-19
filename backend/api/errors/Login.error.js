module.exports = class LoginError extends Error {
    constructor(message) {
        super(message);
        this.name = "Login"
    }
}