module.exports = class UsernameNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "UsernameNotFound"
    }
}