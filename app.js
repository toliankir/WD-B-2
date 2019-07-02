const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const User = require('./userModel');

const server = express();
const port = 3000;
const methods = ['get', 'post', 'put', 'delete', 'update'];
const url = 'mongodb://localhost/my_database';


mongoose.connect(url, {useNewUrlParser: true}, function (err) {
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
        console.log(users);
        res.render('index', {methods: methods, users: users})
    });

});

server.post('/api', (req, res) => {
    console.log("POST");
    User.create({
        _id: new mongoose.Types.ObjectId,
        login: req.body.login,
        password: req.body.password
    }, function (err) {
        if (err) throw err;
        res.send(JSON.stringify((req.body)));
    });


});

server.listen(port, () => console.log('Server start on 3000 port.'));