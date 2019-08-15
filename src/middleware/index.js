const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const appRootDir = require('../helpers/app_root_dir');
const logger = require('../services/logger');

module.exports = function (app) {
    app.use(logger);
    app.use(express.static(path.join(appRootDir, 'public')));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
}