const userRepo = require('../repository/userRepo.js')()

const passwordEncoder = require('../../utilities/passwordEncoder.js')
const jwtUtil = require('../../utilities/jwtUtil.js')

const InvalidRequestError = require('../../errors/InvallidRequest.error')
const RegisterError = require('../../errors/Register.error')
const LoginError = require('../../errors/Login.error')
const UsernameNotFoundError = require('../../errors/UsernameNotFound.error')

/**
 * 
 * @param {object} userRepository a object of the database CRUD class to be used
 * @param {object} passwordEncod a object of the bcrypt class   //not permanent, could switch with action bcrypt class)
 * @param {object} jwtUtility a object that handles all the functionality to generate a jwt token for a user
 * @returns {object} register & login functions
 */

module.exports = (userRepository = userRepo, passwordEncod = passwordEncoder, jwtUtility = jwtUtil) => {

    const register = async(request) => {
        if (!('username' in request) || !('password' in request))
            throw new InvalidRequestError();
        let user = await userRepository.getUser(request.username);
        console.log(user)
        if (user != null)
            throw new RegisterError("Invalid username");
        const passwordHash = await passwordEncod.encode(request.password);
        let result = await userRepository.addUser(request.username, passwordHash);
        if (result == false)
            throw new Error()
        user = {
            username: request.username,
            password: passwordHash
        }
        return jwtUtility.generateToken(user);
    }

    const login = async(request) => {
        if (!('username' in request) || !('password' in request))
            throw new InvalidRequestError();
        let user = await userRepository.getUser(request.username);
        if (user == null)
            throw new UsernameNotFoundError()
        console.log(user)
        let result = await passwordEncod.compare(request.password, user.hash)
        if (result == false)
            throw new LoginError()
        return jwtUtility.generateToken(user)
    }

    return {
        register,
        login
    }
}