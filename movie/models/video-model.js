const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    year: {type: Number, required: true},
    genres: [{type: String}],
    contentRating: {type: String, required: true},
    duration: {type: Number, required: true},
    releaseDate: {type: String, required: true},
    originalTitle: {type: String, required: true},
    storyline: {type: String, required: true},
    actors: [{type: String}],
    imdbRating: {type: Number, min: 0, max: 10},
    posterurl: {type: String, required: true},
    videopath: {type: String, required: true},
}, {timestamps: true});
// const videoSchema = new mongoose.Schema({
//     name: {type: String, required: true},
//     genre: {type: String, required: true},
//     releaseDate: {type: String, required: true},
//     runTime: {type: String, required: true},
//     description: {type: String, required: true},
//     actors: [{type: String}],
//     rating: {type: Number, min: 0, max: 10},
//     production: {type: String, required: true},
//     director: [{type: String}],
//     videoLink: {type: String, required: true},
// }, {timestamps: true});

const videoModel = new mongoose.model('Videos', videoSchema);

module.exports = videoModel; // we work with model not schema so exporting model.