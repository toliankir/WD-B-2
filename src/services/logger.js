const winston = require('winston');
const path = require('path');
const colors = require('../constants/colors');
const appRootDir = require('../helpers/app_root_dir');
require('winston-daily-rotate-file');
const colorsForMethods = {
    GET: colors.FgRed,
    POST: colors.FgBlue,
    DELETE: colors.FgYellow
}

function formatMessageConsole(message) {
    if (typeof message === 'string') {
        return message;
    }
    return `${colorsForMethods[message.method]} ${message.method} ${message.originalUrl} ${colors.Reset}`;
}

function formatMessageFile(message) {
    if (typeof message === 'string') {
        return message;
    }
    return `${message.method} : ${message.originalUrl}`;
}

const winstonLogger = new winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YY-MM-DD HH:MM:SS"
        }),
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            filename: path.join(appRootDir, 'logs', 'log-%DATE%.log'),
            level: 'info',
            format: winston.format.combine(
                winston.format.printf(({ level, timestamp, message }) => {
                    return `${level}: ${timestamp} ${formatMessageFile(message)}`;
                }),
                // winston.format.json()
            ),
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.printf(({ level, timestamp, message }) => {
                    return `${level}: ${timestamp} ${formatMessageConsole(message)}`;
                }),
                winston.format.colorize({ all: true }),
            ),
            level: 'debug',
        })
    ]
});

const logger = ({ method, originalUrl }, res, next) => {
    const msg = {
        method,
        originalUrl
    };
    winstonLogger.info(msg);
    next();
};
module.exports = logger;
module.exports.winstonLogger = winstonLogger;
