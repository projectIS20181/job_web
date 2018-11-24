var express = require('express');
var router = express.Router();
var userRouter = require('./user');


/* GET home page. */
router.get('/', function(req, res, next) {
  var user = req.user ? req.user : undefined;
  console.log("index.js : user",user);
  // var user = 1;
  res.render('index', {
    user: user, 
    title: 'Job solution' 
  });
});




module.exports = router;
