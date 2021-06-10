// const request = require('supertest');
// const { response } = require('../app');
// const app = require('../app');

// const userDB = require('../users/mock/userDB.js');
// const userWatchlist = require('../users/mock/wishlistDB.js');

// describe('register', () => {
//     it('should register a user successfully', async() => {
//         const response = await request(app)
//         .post('/users/')
//         .send({
//             username: "Thato",
//             password: "password"
//         })
//         .expect(201);

//         expect(response.body).toEqual({response: 'Account created.'});
//     })

//     it('should not register a user successfully', async() => {
//         const response = await request(app)
//         .post('/users')
//         .send({
//             username: "Thato",
//             password: "password"
//         })
//         .expect(401);

//         expect(response.body).toEqual({error: 'User already exists.'});
//     })
// });