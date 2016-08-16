var mongoose = require('mongoose');
var crypto = require('crypto');
var logger = require('../helpers/logger');
var Schema = mongoose.Schema;
var CreateUpdatedAt = require('mongoose-timestamp');

// Define Schema
var Web = new Schema({
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
    }
});

Web.plugin(CreateUpdatedAt);

module.exports = mongoose.model('Web', Web);
