const config = require('../config');
const { Pool } = require('pg')

const pool = new Pool({
    user: config.user,
    host: config.host,
    database: config.name,
    password: config.pw,
    port: config.port 
});

module.exports = pool