const mongoose = require('mongoose');

const userVideoSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    video: {type: mongoose.Schema.Types.ObjectId, ref: "Videos"},
    watched: {type: Number, default: 0},
    status: {type: Number, enum:["playing", "finished"],default: "playing"},
    
}, {timestamps: true})

const userVideoModel = new mongoose.model('User-videos', userVideoSchema);

module.exports = userVideoModel;