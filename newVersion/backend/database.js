const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "", //add your password
    database: "WAD_FINAL",
    host: "localhost",
    port: "5432"
});

const execute = async(query) => {
    try {
        await pool.connect(); // create a connection
        await pool.query(query); // executes a query
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

/* 
gen_random_uuid() A system function to generate a random Universally Unique IDentifier (UUID)
An example of generated uuid:  32165102-4866-4d2d-b90c-7a2fddbb6bc8
*/

const createTblQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;

execute(createTblQuery).then(result => {
    if (result) {
        console.log('Table "users" is created');
    }
});

const createTblQuery2 = `
    CREATE TABLE IF NOT EXISTS "posttable" (
	    "id" SERIAL PRIMARY KEY,
	    "title" VARCHAR(200) NOT NULL,
	    "body" VARCHAR(200) NOT NULL,
        "urllink" VARCHAR(200)
    );`;
//    CREATE TABLE IF NOT EXISTS "posttable" (
//        postId uuid PRIMARY KEY DEFAULT gen_random_uuid(),
//        postCreateTime VARCHAR(15),
//        postText VARCHAR(1000)
//    );`;

execute(createTblQuery2).then(result => {
    if (result) {
        console.log('Table "posttable" is created');
    }
});

module.exports = pool;