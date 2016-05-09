var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('weather', {title: 'Welcome'});
})

module.exports = router;
