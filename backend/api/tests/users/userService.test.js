const request = require('supertest');
const { response } = require('../app');
const userService = require('../../users/service/userService.js');

describe('register', () => {

    it('successful register of a user', async() => {
        const request = {
            username: "TestUser",
            password: "Password"
        };
        
        userService.register(request)
        .then(response => {
            expect(response.statusCode).toEqual(201);
        })
        .catch(error => {
            expect(response.statusCode).toEqual(201);
        });
    });
    
});

