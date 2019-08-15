const bodyParser = require('body-parser');
const logger = require('../services/logger');

module.exports = function (app) {
    app.use(logger);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
}
