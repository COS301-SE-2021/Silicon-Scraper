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

    constructor(userRepository = userRepo, passwordEncod = passwordEncoder) {
        this.userRepository = userRepository
        this.passwordEncoder = passwordEncod;
    }

    register = async(request) => {

        if (!('username' in request) || !('password' in request)) {
            return {
                statusCode: 400,
            }
        }
        let user = await this.userRepository.getUser(request.username);
        if (user) {
            return {
                statusCode: 200,
                message: "Username already taken"
            }
        }
        const passwordHash = await this.passwordEncoder.encode(request.password)
        let result = await this.userRepository.addUser(request.username, passwordHash);
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
        if (!('username' in request) || !('password' in request)) {
            return {
                statusCode: 400
            }
        }
        let user = await this.userRepository.getUser(request.username);
        if (!user) {
            return {
                statusCode: 200,
                message: "Invalid login credentials"
            }
        }
        const passwordHash = await this.passwordEncoder.encode(request.password);
        if (user.password != passwordHash) {
            return {
                statusCode: 200,
                message: "Invalid login credentials"
            }
        }
        return {
            statusCode: 200,
            token: jwtUtil.generateToken(user)
        }
    }

    deleteUser(request) {
    
    };
    
    addToWatchlist(request) {
    
    }
    
    removeFromWatchlist(request) {
    
    } 

}