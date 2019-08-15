require("dotenv").config()
const express = require('express');
const ejs = require('ejs');
const path =require('path');
const { initDB } = require('./services/db');
const { winstonLogger } = require('./services/logger');
const server = express();
// require('bootstrap')


const PORT = process.env.PORT || 3000;
initDB();

server.set('view engine', 'ejs');
require('./middleware/index')(server);
require('./middleware/static_folders')(server);
const router = require('./routes/index');
server.use(router);

server.listen(PORT, () => {
    winstonLogger.log({ level: 'info', message: `Server start on ${PORT} port.` });
});
