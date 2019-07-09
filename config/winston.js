const winston = require('winston');
const path = require('path');

const logger = new winston.createLogger({
    transports: [
        new winston.transports.File(
            {
                filename: path.join(__dirname, 'logs', 'all-logs.log'),
                level: 'info',
                format: winston.format.json()
            }
        ),
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize(),
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
