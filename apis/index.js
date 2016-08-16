'use strict';
var express = require('express'),
    router = express.Router();

router.use('/api/v1/member-home-info/mad', require('./memberhomeinfo_mads'));
router.use('/api/v1/member-home-info/c4e', require('./memberhomeinfo_c4es'));
router.use('/api/v1/member-home-info/web', require('./memberhomeinfo_webs'));

module.exports = router;
