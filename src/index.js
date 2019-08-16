require("dotenv").config()
const express = require('express');
const { initDB } = require('./services/db');
const { winstonLogger } = require('./services/logger');
const server = express();
const PORT = process.env.PORT || 3000;

initDB();

server.set('view engine', 'ejs');
//Applay middlewares
require('./middleware/index')(server);
require('./middleware/static_folders')(server);
//Applay routes
server.use(require('./routes/api'));
server.use(require('./routes/web'));

server.listen(PORT, () => {
    winstonLogger.log({ level: 'info', message: `Server start on ${PORT} port.` });
});
