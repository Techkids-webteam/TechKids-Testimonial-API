var mongoose = require('mongoose');
var crypto = require('crypto');
var logger = require('../helpers/logger');
var Schema = mongoose.Schema;
var CreateUpdatedAt = require('mongoose-timestamp');

// Define Schema
var C4E = new Schema({
    name: {
        type: String,
        require: true
    },
    short_description: {
        type: String,
        require: true
    },
    profile_src: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    background_src:{
        type: String,
        require:true
    }
});

C4E.plugin(CreateUpdatedAt);

module.exports = mongoose.model('C4E', C4E);
