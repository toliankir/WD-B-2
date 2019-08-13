const winston = require('winston');
const path = require('path');
require('winston-daily-rotate-file');


const logger = new winston.createLogger({
    transports: [
        new winston.transports.DailyRotateFile({
            filename: path.join(__dirname, 'logs', 'log-%DATE%.log'),
            level: 'info',
            format: winston.format.json()
        }),
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.simple()
            )
        })
    ]
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};

module.exports = logger;
