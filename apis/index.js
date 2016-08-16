'use strict';
var express = require('express'),
    router = express.Router();

router.use('/api/v1/member-home-info/mad', require('./memberhomeinfo_mads'));

module.exports = router;
