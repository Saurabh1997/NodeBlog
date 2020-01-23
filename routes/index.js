var express = require('express');
var router = express.Router();
 var mongo = require('mongodb');
var Post = require('../models/Post');

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find({}, function(err, posts) {
         res.render('index', { posts: posts });
  });
  
  });

module.exports = router;
