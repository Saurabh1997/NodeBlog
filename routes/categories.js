var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var Category = require('../models/Category');
var mongo = require('mongodb');
/* Post add */
router.get('/add', function(req, res, next) {
    res.render('addcategory',{
      'title':'Add Category' 
    }); 
});
router.get('/show/:category', function(req, res, next) {
  Post.find({category: req.params.category}, function(err, posts) {
    res.render('index', {
      title: req.params.category,
      posts: posts });
});
});
router.post('/add', function(req, res, next) {
  var name = req.body.name;
  //form validator
req.checkBody('name', 'name is required').notEmpty();

var errors = req.validationErrors();
if(errors){
  res.render('addcategory',{
    "errors": errors  
  });
  }
  else{
  var newcategory = new Category({
      name: name
  });
      Category.createcategory(newcategory, function(err, category){
        if(err) throw err;
        console.log(category);
      });
      req.flash('success','Category is added successfully');
      res.location('/');
      res.redirect('/');
  
  }
  
});
module.exports = router;
