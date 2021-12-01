const express = require('express');
const app = express();
const pool = require('./database');
// register the ejs view engine
app.set('view engine', 'ejs');
app.listen(3000);

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
   
