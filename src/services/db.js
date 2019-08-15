const fs = require('fs');
const path = require('path');
const { winstonLogger} = require('./logger');
const appRootDir = require('../helpers/app_root_dir');

const dbFile = path.join(appRootDir, 'db',process.env.DB_FILE || 'default_db.json');
const users = [];

module.exports.saveDB = function () {
    fs.writeFile(dbFile, JSON.stringify(users), 'utf8', (err) => {
        if (err) {
            winstonLogger.log({ level: 'warn', message: `Database writing error.` });
            return;
        }
    });
}

module.exports.initDB = function () {
        fs.access(dbFile, fs.constants.F_OK, (err) => {
        if (err) {
            winstonLogger.log({level: 'warn', message: 'Database dose not exist.'});
            createDbFile();
            return;
        }
        fs.readFile(dbFile, (err, data) => {
            if (err) throw err;
            users.push(...JSON.parse(data));
        })
    });
}

module.exports.getDB = function () {
    return users;
}

module.exports.addUser = function (login, password) {
    users.push({
        id: users.length > 0 ? users[users.length - 1].id + 1 : 0,
        login,
        password
    });
    this.saveDB();
}

module.exports.deleteUser = function (id) {
    const userId = users.findIndex(user => {
        return user.id == id;
    });
    users.splice(userId, 1);
    this.saveDB();
}


function createDbFile() {
    fs.writeFileSync(dbFile, JSON.stringify([]), {flag: 'w'}, err => {
        if (err) {
            return err;
        }
    });
}