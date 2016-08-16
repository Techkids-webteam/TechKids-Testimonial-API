var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var C4E = require('../models/memberhomeinfo_C4E'),
    db = require('../models'),
    logger = require('../helpers/logger');

module.exports = router;

// get a list of c4e's member
router.get('/list/:page/:limit', function(req, res) {
    var limit = (req.params.limit) ? req.params.limit : 10;
    var skip = (req.params.page) ? limit * (req.params.page - 1) : 0;
    db.C4E
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
    db.C4E.findOne({
        _id: req.params.id
    }).then(function(c4es) {
        res.send(JSON.stringify(c4es));
    }).catch(function(e) {
        res.status(500).send(JSON.stringify(e));
    });
});

// add a new member-home-info
router.post('/create', function(req, res, next) {
  C4E.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//
// //update a C4E member
// router.put('/update/:id', function(req, res) {
//     db.C4E.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
//         if (err) return next(err);
//         logger.debug('Update C4E A Member By Id', req.params.id);
//         db.C4E.findOne({
//             _id: req.params.id
//         }).then(function(c4es) {
//             res.send(JSON.stringify(c4es));
//         }).catch(function(e) {
//             res.status(500).send(JSON.stringify(e));
//         });
//     });
// });

// delete a C4E member's Confesstion
router.delete('/:id', function(req, res, next) {
  C4E.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
