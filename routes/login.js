var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Article = require('../models/Article');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    member : null
  });
});

router.post('/', function(req, res, next) {
 
  var memberAccount = req.body.account;
  var memberPassword = req.body.password;
  Member.getbyaccount( memberAccount,function(err, member) {
    if(err || memberPassword != member.password ) {
    console.log("wrong");
    res.render('login', {
    member : null
  });

    } else {
         
      req.session.member = member;
      res.redirect('/');
    }
  });
});


router.post('/logout', function(req, res, next) {
  req.session.member = null;
  res.redirect('/login');
});


module.exports = router;
