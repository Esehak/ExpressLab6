var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csrf = require('csurf');
// var validator = require('validator');
var validator = require('express-validator');
var helmet= require('helmet');



var index = require('./routes/index');
var users = require('./routes/users');
var contactus= require('./routes/contactus');
var thankyou= require('./routes/thankyou');

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('x-powered-by',false);
app.disable('etag');
app.set('strict routing', true);
app.enable('case sensitive routing');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(csrf({cookie:true}));
app.use(function(req,res,next){
  res.locals.csrftoken= req.csrfToken();
  next();
});
app.use(validator());
app.use(helmet());
app.use(helmet.xssFilter({setOnOldIE:true}));
app.use(helmet.ieNoOpen());


app.use('/', index);
app.use('/users', users);
app.use('/contactus', contactus);
app.use('/thankyou', thankyou);

// catch 404 and forward to error handler




app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
if(app.get('env')=== 'development'){
  app.use(function(err,req,res,next){
    res.status(err.status || 500);
    res.render('error', {
      message:err.message,
      error:err
    });
  });
}


//Production error handler
//no stack trace

app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    message:err.message,
    error:{}
  });
});

app.listen(2000, '127.0.0.1', ()=>{
  console.log("Server is running ....")
})
module.exports = app;
