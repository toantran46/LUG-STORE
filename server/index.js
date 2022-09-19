const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors')
const { conn, executeQuery } = require('./mysql');
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', cors(), (req, res) => {
    res.send('Hello World!')
})

// connect to DB
conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})