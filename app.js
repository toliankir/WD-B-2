require("dotenv").config()
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const db = require('./db');
const logger = require('./config/winston');

db.initDB();

const server = express();
server.set('view engine', 'ejs');
server.use(morgan('dev', { stream: logger.stream }));
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());


server.get('/', (req, res) => {
    logger.log({ level: 'info', message: 'Index request' });
    res.render('index', { users: db.getDB() })
});

server.post('/api', (req, res) => {
    logger.log({ level: 'info', message: 'API POST request' });
    db.addUser(req.body.login, req.body.password);
    res.send(JSON.stringify({ status: `User ${req.body.login} added.` }));
});

server.get('/api', (req, res) => {
    logger.log({ level: 'info', message: 'API GET request' });
    res.send(JSON.stringify(db.getDB()));
});

server.delete('/api', (req, res) => {
    logger.log({ level: 'info', message: 'API DELETE request' });
    db.deleteUser(req.body.id);
    res.send(JSON.stringify({ status: `Delete ${req.body.id}` }));
});

server.listen(process.env.PORT, () => {
    logger.log({ level: 'info', message: `Server start on ${process.env.PORT} port.` });
});

