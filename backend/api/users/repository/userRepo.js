const configs = require('../../../config');
const {Pool} = require('pg');
const {v4 : uuidv4} = require('uuid');
const { config } = require('dotenv');
const pgp = require('pg-promise')({
    capSQL: true
})

const client = {
    host: configs.host,
    user: configs.user,
    database: configs.name,
    password: configs.pw,
    port: configs.port
}

const db = pgp(
    client
)

const cs = new pgp.helpers.ColumnSet(['id', 'username', 'hash'], {table: 'users'})

module.exports = class UserRepo {

    constructor(dbase = db) {
        this.db = dbase;
    } 

    addUser = async (username, password) => {
        console.log(configs)
    
        const id = uuidv4();
        let result = null;
        const user = {
            id: id,
            username: username,
            hash: password
        };
        const query = pgp.helpers.insert(user, cs);
        await db.none(query)
        .then(res => {
            result = true;
        })
        .catch(err =>  {
            result = false;
        });
        
        return result
    }
    
    getUser = async (username) => {
        const user = {
            username: username
        }
        const query = pgp.as.format("WHERE username = $1", [username]);
        const u = await db.any("SELECT * FROM users $1:raw", query)
        return u;
    }
}

