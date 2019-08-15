const express = require('express');
const router = express.Router();
const db = require('../services/db');

router.get('/', (req, res) => {
    res.render('index', { users: db.getDB() })
});

router.get('/', (req, res) => {
    res.render('index', { users: db.getDB() })
});

router.post('/api', (req, res) => {
    db.addUser(req.body.login, req.body.password);
    res.send(JSON.stringify({ status: `User ${req.body.login} added.` }));
});

router.get('/api', (req, res) => {
    res.send(JSON.stringify(db.getDB()));
});

router.delete('/api', (req, res) => {
    db.deleteUser(req.body.id);
    res.send(JSON.stringify({ status: `Delete ${req.body.id}` }));
});

module.exports = router;
