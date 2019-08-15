const express = require('express');
const router = express.Router();
const db = require('../services/db');

router.get('/', (req, res) => {
    res.render('index', { users: db.getDB() })
});

module.exports = router;
