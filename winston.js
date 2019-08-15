const winston = require('winston');
const path = require('path');
const colors = require('./colors');
require('winston-daily-rotate-file');

const colorsForMethods = {
    GET: colors.FgRed,
    POST: colors.FgBlue,
    DELETE: colors.FgYellow
}

function formatMessage(message) {
    let parsedMessage;
    try {
        parsedMessage = JSON.parse(message);
    } catch (e) {
        return `${colors.BgWhite} ${message} ${colors.Reset}`;
    }
    return `${colorsForMethods[parsedMessage.method]} ${parsedMessage.method} ${parsedMessage.originalUrl} ${colors.Reset}`;
    
}

const winstonLogger = new winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YY-MM-DD HH:MM:SS"
        }),
        winston.format.printf(({ level, timestamp, message }) => {
            return `${level}: ${timestamp} ${formatMessage(message)}`;
        })
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            filename: path.join(__dirname, 'logs', 'log-%DATE%.log'),
            level: 'info',
            format: winston.format.json(),
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
            ),
            level: 'debug',
        })
    ]
});



const logger = ({ method, originalUrl }, res, next) => {
    winstonLogger.log('info', JSON.stringify({
        method,
        originalUrl
    }));
    next();
};
module.exports = logger;
module.exports.winstonLogger = winstonLogger;
