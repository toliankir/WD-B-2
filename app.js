require("dotenv").config()

const bcypt = require('bcrypt');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const User = require('./userModel');

const saltRounds = 10;
const server = express();


mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}, function (err) {
    if (err) throw err;
    console.log('Mongoose DB successfully connected');
});

server.set('view engine', 'ejs');

server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

server.get('/', (req, res) => {
    User.find().exec(function (err, users) {
        if (err) throw err;
        res.render('index', {users: users})
    });

});

server.post('/api', (req, res) => {
    console.log("POST");
    bcypt.hash(req.body.password, saltRounds, function (err, hash) {
        User.create({
            _id: new mongoose.Types.ObjectId,
            login: req.body.login,
            password: hash
        }, function (err) {
            if (err) throw err;
            res.send(JSON.stringify((req.body)));
        });
    });

});

server.get('/api', (req, res) => {
    console.log("GET");
    User.find().exec(function (err, users) {
        if (err) throw err;
        res.send(JSON.stringify(users));
    });
});

server.delete('/api', (req, res) => {
    User.findByIdAndDelete(req.body.id, function (err) {
        if (err) throw err;
        res.send(`Delete ${req.body.id}`);
    });
});


server.listen(process.env.PORT, () => console.log(`Server start on ${process.env.PORT} port.`));