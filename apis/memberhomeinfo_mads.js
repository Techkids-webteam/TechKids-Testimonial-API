var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MAD = require('../models/memberhomeinfo_MAD'),
    db = require('../models'),
    logger = require('../helpers/logger');

module.exports = router;

// get a list of mad's member
router.get('/list/:page/:limit', function(req, res) {
    var limit = (req.params.limit) ? req.params.limit : 10;
    var skip = (req.params.page) ? limit * (req.params.page - 1) : 0;
    db.MAD
        .find()
        .skip(skip)
        .limit(limit)
        .sort({
            '_id': 'desc'
        })
        .then(function(mads) {
            res.send(JSON.stringify(mads));
        }).catch(function(e) {
            res.status(500).send(JSON.stringify(e));
        });
});


// get a product by id
router.get('/get/:id', function(req, res) {
    logger.debug('Get A Member By Id', req.params.id);
    db.MAD.findOne({
        _id: req.params.id
    }).then(function(mads) {
        res.send(JSON.stringify(mads));
    }).catch(function(e) {
        res.status(500).send(JSON.stringify(e));
    });
});

// create a new product
router.post('/create', function(req, res, next) {
  MAD.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
