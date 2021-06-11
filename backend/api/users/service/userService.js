const UserRepo = require('../repository/userRepo.js')
const userRepo = new UserRepo()

const passwordEncoder = require('../../utilities/passwordEncoder.js')
const jwtUtil = require('../../utilities/jwtUtil.js')

/**
 * 
 * @param {} request 
 * @returns 
 */


module.exports = class UserService {

    constructor(userRepo, passwordEncoder) {
        this.userRepo = userRepo
        this.passwordEncoder = passwordEncoder;
    }

    register = async(request) => {

        if (!('username' in request) || !('password' in request)) {
            return {
                statusCode: 400,
            }
        }
        let user = await this.userRepo.getUser(request.username);
        if (user) {
            return {
                statusCode: 200,
                message: "Username already taken"
            }
        }
        const passwordHash = await this.passwordEncoder.encode(request.password);
        let result = await this.userRepo.addUser(request.username, passwordHash);
        user = {
            username: request.username,
            password: passwordHash
        }
        if (result == true) {
            return {
                statusCode: 201,
                token: jwtUtil.generateToken(user)
            }
        }
        return {
            statusCode: 500
        }

    }


    login = async(request) => {
        if (!('username' in request)) {
            return {
                statusCode: 400
            }
        }
    }

    deleteUser(request) {
    
    };
    
    addToWatchlist(request) {
    
    }
    
    removeFromWatchlist(request) {
    
    } 

}