const configs = require('../../../config.js');
const {Client} = require('pg');
const {v4 : uuidv4} = require('uuid');

const db = new Client({
    user: configs.user,
    host: configs.host,
    database: configs.name,
    password: configs.pw,
    port: configs.port
});

module.exports = class UserRepo {

    constructor() {
        this.db = db;
        this.db.connect();
    } 

    addUser = async (username, password) => {
        const id = uuidv4();
        const query = "INSERT INTO Users(id, username, password) VALUES (?, ?, ?)";
        let result = null;
        await this.db.query(query, [id, username, password])
        .then(res => {
            result = true;
        })
        .catch(err => {
            result = false;
        });
        
        return result
    }
    
    getUser = async (username) => {
        const query = "SELECT * FROM Users WHERE username = ?";
        return await this.db.query(query, [username])
        .then(user => {
            return user;
        })
        .catch(err => {
            return null;
        });
    }
}

