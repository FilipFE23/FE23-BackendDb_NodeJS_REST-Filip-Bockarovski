const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const db = require('./db.js');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', async (req, res) => {
  const sql = 'SHOW TABLES';
  const dbData = await db.query(sql);
  res.render('index', {dbData});
});

const port = 3000;
app.listen(port, () => {
    console.log(`Main log: server is running on  http://localhost:${port}/`);
});