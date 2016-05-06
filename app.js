var express     = require('express');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var app = express();

app.set('view engine', 'ejs');

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

var weatherRouter = require('./routes/weather');
app.use('/weather', weatherRouter);

app.use(express.static('./public'));

app.listen( 8080, function(){
  console.log( '... awaiting connections on port: 8080' );
});
