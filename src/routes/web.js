const express = require('express');
const router = express.Router();
const db = require('../services/db');
const util = require('util');

router.get('/', (req, res) => {
    res.render('index', { users: db.getDB() })
});

router.get('*', (req, res) => {
    const status = 404;
    const url = `${req.protocol}://${req.hostname}${req.originalUrl}`;
    res.status(status).render('404', {
        url,
        status
    });
})

module.exports = router;
