module.exports = class InvalidRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidRequest"
    }
}