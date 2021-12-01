const Pool = require('pg').Pool;
const pool = new Pool({
 user: "postgres",
 password: "Homework4",
 database: "postsdb",
 host: "localhost",
 port: "5432"
});
module.exports = pool;