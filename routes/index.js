var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login ' });
});

router.get('/users', function(req, res, next) {
  res.render('users', { title: 'Sign up ' });
});


router.post('/users/submit',function(req,res,next){
  var username = req.body.username;
  var password = req.body.password;

  var query=`INSERT INTO users (username,password) VALUES("${username}","${password}")`;

  db.query(query,function(err,result){
    if(err) throw err;
    res.redirect('/');
  });
});

router.post('/submit',function(req,res,next){
  var username= req.body.username;
  var password = req.body.password;

  var query = `SELECT username from users where username="${username}" and password="${password}" `

  db.query(query,function(err,result){
    if(err) throw err;
    if(result.length !==0){
      res.redirect('/products');
    }
  });
});

module.exports = router;
