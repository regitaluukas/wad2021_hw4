const express = require('express');
const pool = require('./database');

const app = express();

// register the ejs view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.listen(3000, () => {
 console.log("Server is listening to port 3000")
});


app.get('/posts', async(req, res) => {
    try {
    console.log("get posts request has arrived");
    const posts = await pool.query(
    "SELECT * FROM posts"
    );
    res.json(posts.rows);
    } catch (err) {
    console.error(err.message);
    }
});

app.get('/posts/:id', async(req, res) => {
    try {
    console.log("get a post request has arrived");
    const {id} = req.params
    const posts = await pool.query(
    "SELECT * FROM posts WHERE id = $1", [id]
    );
    res.json(posts.rows[0]);
    } catch (err) {
    console.error(err.message);
 }
});

app.post('/posts/', async(req, res) => {
    try {
    console.log("a post request has arrived");
    const post = req.body;
    const newpost = await pool.query(
    "INSERT INTO posts(title, body, urllink) posts ($1, $2, $3) RETURNING*", [post.title, post.body, post.urllink]
    );
    res.json( newpost );
    } catch (err) {
    console.error(err.message);
    }
});

app.delete('/posts/:id', async(req, res) => {
    try {
    const {id} = req.params;
    const post = req.body;
    console.log("delete a post request has arrived");
    const deletepost = await pool.query("DELETE FROM posts WHERE id = $1", [id]
    );
    res.json(post);
    } catch (err) {
    console.error(err.message);
    }
});
