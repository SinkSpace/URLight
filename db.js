const { Pool } = require('pg');

const pool = new Pool({
    user: 'urlserver',
    host: 'localhost',
    database: 'urlight',
    password: 'urlight',
    port: 5432,
})

module.exports = pool;