const query = jest.fn();

const database = {
    query
}

const UserService = require('../../users/service/userService.js');
const userService = new UserService(database);


describe('register', () => {

    it('successful register of a user', async() => {
        const request = {
            username: "TestUser",
            password: "Password"
        };
        
        userService.register(request)
        .then(res => {

        })
        .catch(err => {

        });

        expect(query.mock.calls.length).toBe(1);
    });
    
});