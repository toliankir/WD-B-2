const mongoose = require('mongoose');

const url = 'mongodb://localhost/my_database';

mongoose.connect(url, {useNewUrlParser: true}, function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: String,
        lastName: String
    },
    desc: String,
    created: Date
});

const User = mongoose.model('User', userSchema);
User.find({desc: 'Temp'});
// const userModel = new User({
//     _id: new mongoose.Types.ObjectId,
//     name:{
//         firstName: 'Temp first name',
//         lastName: 'Temp last name'
//     },
//     desc: 'Temp desctioption'
// });
//
// userModel.save(function (err) {
//    if (err) throw err;
//    console.log('User saved');
// });

