require("dotenv").config()
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const logger = require('./config/winston');

const server = express();
server.set('view engine', 'ejs');
server.use(morgan('combined', {stream: logger.stream}));
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

const users = [];
const dbFile = path.join(__dirname, process.env.DB_FILE);

fs.access(dbFile, fs.constants.F_OK, (err) => {
    if (err) {
        return;
    }
    fs.readFile(dbFile, (err, data) => {
        if (err) throw err;
        users.push(...JSON.parse(data));
    })
});


server.get('/', (req, res) => {
    res.render('index', {users: users})
});

server.post('/api', (req, res) => {
    users.push({
        id: users.length > 0 ? users[users.length - 1].id + 1 : 0,
        login: req.body.login,
        password: req.body.password
    });
    saveDB();
    res.send(JSON.stringify({status: `User ${req.body.login} added.`}));
});

server.get('/api', (req, res) => {
    res.send(JSON.stringify(users));
});

server.delete('/api', (req, res) => {
    const userId = users.findIndex(user => {
        return user.id == req.body.id;
    });
    users.splice(userId, 1);
    saveDB();
    res.send(JSON.stringify({
        status: `Delete ${req.body.id}`
    }));
});

server.listen(process.env.PORT, () => console.log(`Server start on ${process.env.PORT} port.`));

function saveDB() {
    fs.writeFile(dbFile, JSON.stringify(users), 'utf8', (err) => {
    });
}
