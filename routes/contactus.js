var express = require('express');
var router = express.Router();
const fs= require('fs');
// var validator= require('express-validator');

/* GET home page. */



router.get('/', function (req, res, next) {
  res.render('contactus', { title: 'Contactus', success: false, errors: {}, csrfToken: req.csrfToken() });
});




router.post('/', function(req, res, next) {
    
     req.assert('fname', 'Fullname is required').notEmpty();
     
     req.assert('message', 'Message is required').notEmpty();
     var errors= req.validationErrors();
     console.log(errors.length);

if (errors)
    res.render('contactus', { title: 'Contactus', errors: errors, 
    success: false, csrfToken: req.csrfToken() });
  else {
    var body = 'Full Name: ' + req.body.fname + '   ' + 'Type: ' + req.body.type + '   ' + 'Message: ' + req.body.message + '\n';

    fs.exists('./data/CS572.txt', (exists) => {
      if (exists) {
        fs.appendFile('./data/CS572.txt', body, function (err, data) {
          if (err) throw err;
          res.locals.name=req.body.name;
           res.redirect('thankyou');


          
          console.log('Done!');
        });
      } else {
        fs.writeFile('./data/CS572.txt', body, function (err, data) {
          if (err) throw err;
          console.log('Done!');
        });
      }

    });

    res.render('contactus', { title: 'Contactus', errors: errors, success: true, csrfToken: req.csrfToken() });
  }

});

module.exports = router;


    

// app.use('/contactus',function(req,res){
//   var name= req.body.name;
// });