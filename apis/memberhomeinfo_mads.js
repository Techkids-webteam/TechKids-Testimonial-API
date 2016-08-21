var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MAD = require('../models/memberhomeinfo_MAD'),
    db = require('../models'),
    logger = require('../helpers/logger');

module.exports = router;

// get listing
router.get('/list/', function(req, res, next) {
  db.MAD.find(function (err, mads) {
    if (err) return next(err);
    res.json(mads);
  });
});
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
        .then(function(c4es) {
            res.send(JSON.stringify(c4es));
        }).catch(function(e) {
            res.status(500).send(JSON.stringify(e));
        });
});


// get a member-home-info by id
router.get('/get/:id', function(req, res) {
    logger.debug('Get A Member By Id', req.params.id);
    db.MAD.findOne({
        _id: req.params.id
    }).then(function(c4es) {
        res.send(JSON.stringify(c4es));
    }).catch(function(e) {
        res.status(500).send(JSON.stringify(e));
    });
});
// 
// // add a new MAD member's info
// router.post('/create', function(req, res, next) {
//     MAD.create(req.body, function(err, post) {
//         if (err) return next(err);
//         res.json(post);
//     });
// });

//
// // update a MAD member's Confesstion
// router.put('/update/:id', function(req, res) {
//     db.MAD.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
//         if (err) return next(err);
//         logger.debug('Update MAD A Member By Id', req.params.id);
//         db.C4E.findOne({
//             _id: req.params.id
//         }).then(function(c4es) {
//             res.send(JSON.stringify(c4es));
//         }).catch(function(e) {
//             res.status(500).send(JSON.stringify(e));
//         });
//     });
// });

// delete a MAD member's Confesstion
router.delete('/:id', function(req, res, next) {
  MAD.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
