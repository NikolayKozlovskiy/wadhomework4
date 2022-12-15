
// if you do not want to show your credentials use env.js 
// and put there PASSWORD and DATABASE 

require('./env')
const Pool = require('pg').Pool;

// this code will work and a table will be created if you have already created the "testWad" database.
const pool = new Pool({
    user: "postgres",
    password: PASSWORD, // Enter your password here
    database: DATABASE, // Can change just manually
    host: "localhost",
    port: "5432"
});


const execute = async(query) => {
    try {
        await pool.connect(); // gets connection
        await pool.query(query); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};


const createTblposttable = `
    CREATE TABLE IF NOT EXISTS "posttable" (
        id SERIAL PRIMARY KEY,
        body VARCHAR(200),
        month_name VARCHAR(9),
        day_num SMALLINT,
        year INTEGER

    );`;


const createTblusers = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;


execute(createTblposttable).then(result => {
        if (result) {
            console.log('Table "posttable" is created');
        }
    });    

execute(createTblusers).then(result => {
    if (result) {
        console.log('Table "users" is created');
    }
});    

module.exports = pool;