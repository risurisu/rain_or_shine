var express = require('express'),
    router = express.Router(),
    /*
      'path' is needed because relative paths ../../ are considered malicious
      when importing modules in node. Example: importing routes in index.js
    */
    path = require('path');

router.get('/', function(req, res, next) {
  res.sendFile( path.resolve('client/public/views/user.html') );
});

module.exports = router;

// adding jwt template for authorization.
var express = require("express");
var usersRouter = express.Router();
var User = require("../../models/user");
// var tokenAuthMiddleware = require('../../lib/authorizeRoute.js');
var passport = require("../../lib/passportStrategy.js");

usersRouter.post("/", function(req, res){
  User.create( req.body.user, function( err, dbUser ){
      if(err){ console.log(err); } //  dont do this

      res.json( dbUser );
  });
});

//any route above this line isnt protected
usersRouter.use( passport.authenticate("jwt", { session: false} ) );

usersRouter.get("/", function(req, res){});


module.exports = usersRouter;
