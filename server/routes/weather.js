var express = require('express'),
    router = express.Router(),
    /*
      'path' is needed because relative paths ../../ are considered malicious
      when importing modules in node. Example: importing routes in index.js
    */
    path = require('path');

router.get('/', function(req, res, next) {
  res.sendFile( path.resolve('client/public/views/weather.html') );
});

// router.use( passport.authenticate("jwt"));
//
// router.post("/", function(req, res){
//   //create the weather
//   Weather.create( req.body.weather, function(err, weather){
//     if(err){
//       //error handle
//     }
//
//     req.user.events.push(weather);
//     req.user.save();
//
//   });
//
// })

module.exports = router;
