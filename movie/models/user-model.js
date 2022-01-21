const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: 'string', required: true},
    email: {type: 'string', required: true, unique: true},
    password: {type: 'string', required: true},
    username: {type: 'string', required: true, unique: true},
}, {timestamps: true});

const userModel = new mongoose.model('Users', userSchema);

module.exports = userModel; // we work with model not schema so exporting model.