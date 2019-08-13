const winston = require('winston');
const path = require('path');

require('winston-daily-rotate-file');

const winstonLogger = new winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YY-MM-DD HH:MM:SS"
        }),
        winston.format.printf(info => {
            return `${info.level}: ${info.timestamp} ${info.message}`;
        })
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            filename: path.join(__dirname, 'logs', 'log-%DATE%.log'),
            level: 'info',
            format: winston.format.json()
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
            ),
            level: 'debug',
        })
    ]
});

// logger.stream = {
//     write: function (message, encoding) {
//         logger.info(message);
//     }
// };

const logger = (req, res, next) => {
    winstonLogger.log('info', `${req.method} ${req.originalUrl}`);
    next();
};
module.exports = logger;
module.exports.winstonLogger = winstonLogger;