const db = {}

const userRepo = require('../../users/repository/userRepo.js')(db)

describe('User repository test', () => {

    const username = "username";
    const password = "password";

    beforeEach(() => {
        db.oneOrNone = jest.fn((a => Promise.resolve({"id": 1, "username": "THato"})))
        db.none = jest.fn((query) => Promise.resolve(1))
    })

    it('inserting a user into a database', async() => {

        let response = await userRepo.addUser(username, password);
        expect(db.none.mock.calls.length).toBe(1);
    })

    it('getting a user from a database', async() => {

        let response = await userRepo.getUser(username);
        expect(db.none.mock.calls.length).toBe(0);
    })
})
