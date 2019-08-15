require("dotenv").config()
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const db = require('./db');
const logger = require('./winston');

db.initDB();

const server = express();
server.set('view engine', 'ejs');
server.use(logger);
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());


server.get('/', (req, res) => {
    res.render('index', { users: db.getDB() })
});

server.post('/api', (req, res) => {
    db.addUser(req.body.login, req.body.password);
    res.send(JSON.stringify({ status: `User ${req.body.login} added.` }));
});

server.get('/api', (req, res) => {
    res.send(JSON.stringify(db.getDB()));
});

server.delete('/api', (req, res) => {
    db.deleteUser(req.body.id);
    res.send(JSON.stringify({ status: `Delete ${req.body.id}` }));
});

server.listen(process.env.PORT, () => {
    logger.winstonLogger.log({ level: 'info', message: `Server start on ${process.env.PORT} port.` });
});
