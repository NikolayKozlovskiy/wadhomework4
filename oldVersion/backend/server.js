const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

app.use(express.json());
app.use(cookieParser());

const secret = "gdgdahsgjgdekb770785rgdzqws";
const maxAge = 100 * 60; 

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
}

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});


// AUTHENTICATE
app.get('/auth/authenticate', async(req, res) => {
    console.log('authentication request has been arrived');
    const token = req.cookies.jwt; 
    let authenticated = false; 
    try {
        if (token) { 
            await jwt.verify(token, secret, (err) => { 
                if (err) { 
                    console.log(err.message);
                    console.log('token is not verified');
                    res.send({ "authenticated": authenticated }); 
                } else {
                    console.log('author is authinticated');
                    authenticated = true;
                    res.send({ "authenticated": authenticated }); 
                }
            })
        } else { 
            console.log('author is not authinticated');
            res.send({ "authenticated": authenticated }); 
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// SIGN UP
app.post('/auth/signup', async(req, res) => {
    try {
        console.log("a signup request has arrived");
        //console.log(req.body);
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt();
        const bcryptPassword = await bcrypt.hash(password, salt)
        const authUser = await pool.query(
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id); 
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// LOGIN 
app.post('/auth/login', async(req, res) => {
    try {
        console.log("a login request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id })
            .send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// ADD POST 
app.post('/api/posts', async(req, res) => {
    try {
        console.log("a post request has arrived");
        const post = req.body;
        const newpost = await pool.query(
            "INSERT INTO posttable(body, month_name, day_num, year) values ($1, to_char(now(), 'Month'), EXTRACT(DAY FROM now()), EXTRACT(YEAR FROM now()))    RETURNING*", [post.body]
        );  

        res.json(newpost);
    } catch (err) {
        console.error(err.message);
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


// LOGOUT 
app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});