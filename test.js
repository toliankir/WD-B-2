const bcrypt = require("bcrypt");
const saltRounds = 10;
const pass = "password";


bcrypt.hash(pass, saltRounds, function (err, hash) {
    console.log(hash);

    bcrypt.compare(pass, hash, function (err, res) {
        console.log(`pass ${res}`);
    });
    bcrypt.compare('123', hash, function (err, res) {
        console.log(`non-pass ${res}`);
    });
});
