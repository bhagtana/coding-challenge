var router = require('express').Router();
var path = require('path');

router.get('/homepage', function(req, res) {
  res.json('Hello from Sunny');
})
module.exports = router;