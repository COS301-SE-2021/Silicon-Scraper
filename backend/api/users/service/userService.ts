import userRepo from "../repository/userRepo";
import ErrorTypes from "../../errors/ErrorTypes";
import * as jwtUtil from '../../utilities/jwtUtil';
import * as passwordEncoder from '../../utilities/passwordEncoder';

const InvalidRequestError = ErrorTypes.InvalidRequestError;
const RegisterError = ErrorTypes.RegisterError;
const LoginError = ErrorTypes.LoginError;
const UsernameNotFoundError = ErrorTypes.UsernameNotFoundError;

/**
 * 
 * @param {object} userRepository a object of the database CRUD class to be used
 * @param {object} passwordEncod a object of the bcrypt class   //not permanent, could switch with action bcrypt class)
 * @param {object} jwtUtility a object that handles all the functionality to generate a jwt token for a user
 * @returns {object} register & login functions
 */

module.exports = (userRepository:any = userRepo, passwordEncod:any = passwordEncoder, jwtUtility = jwtUtil) => {

    /**
     * This function handles the functionality of a user registering on the platform. It takes in
     * an object containing the potential  user's username and password. From there the registration process occurs.
     * If the object passed in is missing any of the needed parameters (username / password) then a InvalidRequestError
     * is  then thrown. If the user registered successfully then a JWT token is then returned to the user which identifies
     * the user uniquely for every request. If the registration process was unsuccessful (either the query was 
     * unsuccessful or the username is alreadu in use by another use) then a generic error is then thrown. 
     * 
     * @param {object} request that contains the details of the user wanting to register
     * @throws {object} InvalidRequestError for missing parameters
     * @throws {object} Register Error if the user (with the username) already exists
     * @throws {object} Error if an error occurred when inserting
     * @returns {string} a jwt token which identifies a user uniquely
     */

    const register = async(request) => {
        if (!('username' in request) || !('password' in request))
            throw new InvalidRequestError('missing paramater(s)');
        let user = await userRepository.getUser(request.username);
        if (user != null)
            throw new RegisterError("Invalid username");
        const passwordHash = await passwordEncod.encode(request.password);
        let result = await userRepository.addUser(request.username, passwordHash);
        if (result == null)
            throw new Error()
        user = {
            id: result,
            username: request.username,
            password: passwordHash
        }
        return jwtUtility.generateToken(user);
    }

    /**
     * This function handles the process of a user logging in. If the login process was successful then it generates
     * a JWT token with the user's details which will be used to uniquely identify a user. If it was not successful then
     * an error will be thrown.
     * 
     * @param {object} request containing the user's username and password
     * @throws {object} InvalidRequestError if parameters are missing
     * @throws {object} UsernameNotFoundError if a user with the username is not found (registered)
     * @throws {object} LoginError if an error occured when loggin in or if the password is incorrect
     * @returns {string} JWT token
     */

    const login = async(request) => {
        if (!('username' in request) || !('password' in request))
            throw new InvalidRequestError('missing parameter(s)');
        let user = await userRepository.getUser(request.username);
        if (user == null)
            throw new UsernameNotFoundError(`user with username ${request.username} does not exist`);
        let result = await passwordEncod.compare(request.password, user.hash)
        if (result == false)
            throw new LoginError('invalid password')
        return jwtUtility.generateToken(user)
    }

    return {
        register,
        login
    }
}