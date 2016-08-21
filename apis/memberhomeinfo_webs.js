var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Web = require('../models/memberhomeinfo_WEB'),
    db = require('../models'),
    logger = require('../helpers/logger');

module.exports = router;

// get listing
router.get('/', function(req, res, next) {
  db.Web.find(function (err, mads) {
    if (err) return next(err);
    res.json(mads);
  });
});
// get a list of Web's member
router.get('/list/:page/:limit', function(req, res) {
    var limit = (req.params.limit) ? req.params.limit : 10;
    var skip = (req.params.page) ? limit * (req.params.page - 1) : 0;
    db.Web
        .find()
        .skip(skip)
        .limit(limit)
        .sort({
            '_id': 'desc'
        })
        .then(function(webs) {
            res.send(JSON.stringify(webs));
        }).catch(function(e) {
            res.status(500).send(JSON.stringify(e));
        });
});


// get a member-home-info by id
router.get('/get/:id', function(req, res) {
    logger.debug('Get A Member By Id', req.params.id);
    db.Web.findOne({
        _id: req.params.id
    }).then(function(webs) {
        res.send(JSON.stringify(webs));
    }).catch(function(e) {
        res.status(500).send(JSON.stringify(e));
    });
});

// // add a new Web member's info
// router.post('/create', function(req, res, next) {
//     Web.create(req.body, function(err, post) {
//         if (err) return next(err);
//         res.json(post);
//     });
// });

//
// //update a Web member
// router.put('/update/:id', function(req, res) {
//     db.Web.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
//         if (err) return next(err);
//         logger.debug('Update Web A Member By Id', req.params.id);
//         db.Web.findOne({
//             _id: req.params.id
//         }).then(function(webs) {
//             res.send(JSON.stringify(webs));
//         }).catch(function(e) {
//             res.status(500).send(JSON.stringify(e));
//         });
//     });
// });

// delete a Web member's Confesstion
router.delete('/:id', function(req, res, next) {
  Web.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
