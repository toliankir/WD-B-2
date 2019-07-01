const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const server = express();
const port = 3000;

const methods = ['get', 'post', 'put', 'delete', 'update'];

server.set('view engine', 'ejs');

server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

server.get('/', (req, res) => res.render('index', {methods: methods, abc: 123}));

server.post('/action', (req, res) => {
    console.log(req);
    res.send(JSON.stringify((req.body)));
});

server.put('/action', (req, res) => {
    console.log(req);
    res.send(JSON.stringify((req.body)));
});

server.listen(port, () => console.log('Server start on 3000 port.'));