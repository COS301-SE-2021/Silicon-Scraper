const db = {}

const UserRepo = require('../../users/repository/userRepo.js');
const userRepo = new UserRepo(db);

describe('User repository test', () => {

    const username = "username";
    const password = "password";

    beforeEach(() => {
        db.query = jest.fn((a, b) => Promise.resolve())
    })

    it('inserting a user into a database', async() => {

        let response = await userRepo.addUser(username, password);
        expect(db.query.mock.calls.length).toBe(1);
    })

    it('getting a user from a database', async() => {

        let response = await userRepo.getUser(username);
        expect(db.query.mock.calls.length).toBe(1);
    })
})
