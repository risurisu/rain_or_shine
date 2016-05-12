var express = require('express'),
    router = express.Router(),
    /*
      'path' is needed because relative paths ../../ are considered malicious
      when importing modules in node. Example: importing routes in index.js
    */
    path = require('path');

router.get('/', function(req, res, next) {
  res.sendFile( path.resolve('client/public/views/weather.html') );
//  res.json (req.user.searches);
});
  //
  // Weather.create(req.body.weather, function (err, weather){
  //   console.log("output: " + weather);
  //   if (err) { res.status(500).json(err) }
  //   req.user.searches.push(weather); // push/update weather data to user profile     // searches is array in user model
  //   req.user.save(function(err){    // save the data or it wont work!
  //     console.log(err)
  //   });
  //   res.json( weather );   // object called in the success callback in scripts.js
  // })




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
