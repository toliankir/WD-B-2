const fs = require('fs');
const path = require('path');
const logger = require('./winston');

const dbFile = path.join(__dirname, process.env.DB_FILE);
const users = [];

module.exports.saveDB = function () {
    fs.writeFile(dbFile, JSON.stringify(users), 'utf8', (err) => {
        if (err) {
            logger.log({ level: 'warn', message: `Database writeing error.` });
            return;
        }
    });
}

module.exports.initDB = function () {
    fs.access(dbFile, fs.constants.F_OK, (err) => {
        if (err) {
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