var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('API is running');
});

router.use('/spots', require('./spots'));

module.exports = router;
