var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  //res.send('respond with a resource');
   res.locals.name=req.body.fname;
   //console.log(req.body.fname);
  // res.render('thankyou', {'name': req.body.fname });
  res.render('thankyou');
});

module.exports = router;
