const dotenv = require('dotenv');
dotenv.config();

const configs = {
    port : process.env.DB_PORT,
    name : process.env.DB_NAME,
    host : process.env.DB_HOST,
    pw : process.env.DB_PW,
    user : process.env.DB_USER
}

module.exports = configs;