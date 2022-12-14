const express = require('express');
const pool = require('./database');
const cors = require('cors')
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

// ADD POST 
app.post('/api/posts', async(req, res) => {
    try {
        console.log("a post request has arrived");
        const post = req.body;
        const newpost = await pool.query(
            "INSERT INTO posttable(body, month_name, day_num, year) values ($1, to_char(now(), 'Month'), EXTRACT(DAY FROM now()), EXTRACT(YEAR FROM now()))    RETURNING*", [post.body]
        );  
        
        // await pool.query("UPDATE posttable SET month_name= to_char(datetime, 'Month'), day_num=EXTRACT(DAY FROM datetime), year = EXTRACT(YEAR FROM datetime)")
        res.json(newpost);
    } catch (err) {
        console.error(err.message);
    }
}); 

// DELETE ALL POSTS 
app.delete('/api/posts', async(req, res)=> {
    try {
        console.log("delete posts request has arrived");
        await pool.query(
            "TRUNCATE TABLE posttable"
        )
        res.json({ message: 'All records deleted successfully' });
    } catch(err) {
        console.error(err.message)
    }
});

// GET ALL POSTS
app.get('/api/posts', async(req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool.query(
            "SELECT * FROM posttable"
        );
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// GET SPECIFIC POST
app.get('/api/posts/:id', async(req, res) => {
    try {
        console.log("get a post with route parameter request has arrived");
        const { id } = req.params;
        const posts = await pool.query( 
            "SELECT * FROM posttable WHERE id = $1", [id]
        );
        res.json(posts.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
}); 

// UPDATE SPECIFIC POST
app.put('/api/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const post = req.body;
        console.log("update request has arrived");
        const updatepost = await pool.query(
            "UPDATE posttable SET body = $2 WHERE id = $1", [id, post.body]
        );
        res.json(updatepost);
    } catch (err) {
        console.error(err.message);
    }
});

// DELETE SPECIFIC POST 
app.delete('/api/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        console.log("delete a post request has arrived");
        const deletepost = await pool.query(
            "DELETE FROM posttable WHERE id = $1", [id]
        );
        res.json(deletepost);
    } catch (err) {
        console.error(err.message);
    }
}); 


app.listen(port, () => {
    console.log("Server is listening to port " + port)
});