const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});
userSchema.plugin(timestamps);

module.exports = mongoose.model('User', userSchema);

