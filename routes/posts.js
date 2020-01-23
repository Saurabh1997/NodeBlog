var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './public/images'});
var Post = require('../models/Post');
var Category = require('../models/Category');
var Comment = require('../models/Comment');

var mongo = require('mongodb');

router.get('/show/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post){
    Comment.find({ 'postId': req.params.id }, (err, comments) =>{
        if(comments){
          res.render('show',{
            'post':post,
            'comments':comments
          });
        }
        else{
          res.render('show',{
            'post':post
          });
          
        }

    });
  
  });
});

router.get('/add', function(req, res, next) {
  Category.find({}, function(err, categories){
    console.log(categories);
    res.render('addPost',{
      'title':'Add Posts',
      'categories':categories 
    });
  });
  
  
});
router.post('/add',upload.single('mainimage'), function(req, res, next) {
  var title = req.body.title;
  var category = req.body.category;
  var body = req.body.body;
  var author = req.body.author;
  var date = new Date();
  var mainimage;
  if(req.file){
     mainimage = req.file.filename;
  }
  else{
     mainimage = 'noimage.jpg';
  }
  //form validator
req.checkBody('title', 'Title is required').notEmpty();
req.checkBody('body', 'Body is required').notEmpty();
var errors = req.validationErrors();
if(errors){
  Category.find({}, function(err, categories){
    console.log(categories);
    res.render('addPost',{
      'title':'Add Posts',
      'categories':categories,
      'errors': errors 
    });
  });
}
  else{
  var newPost = new Post({
      title: title,
      category: category,
      body: body,
      mainimage: mainimage,
      author: author
  });
      Post.createPost(newPost, function(err, post){
        if(err) throw err;
        console.log(post);
      });
      req.flash('success','Post is created successfully');
      res.location('/');
      res.redirect('/');
  }
  });

  //For adding comments


router.post('/addcomment', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var body = req.body.body;
  var postid = req.body.postid;
  var commentdate = new Date();
  console.log(postid + " this is postid");
  //form validator
req.checkBody('name', 'Title is required').notEmpty();
req.checkBody('email', 'Email is required but not displayed').notEmpty();
req.checkBody('email', 'Not a valid Email').isEmail();
req.checkBody('body', 'Body is required').notEmpty();
var errors = req.validationErrors();
if(errors)
{
  Post.findById(postid, function(err, post){
    Comment.find({ 'postId': postid }, (err, comments) =>{
      if(comments){
        res.render('show',{
          'post':post,
          'comments':comments,
          'errors':errors
        });
      }
      else{
        res.render('show',{
          'post':post,
          'errors':errors
        });
        
      }

  });
  });

}
  else
  {
  var comment = new Comment({
    'postId': postid,
    'name':name,
    'email':email,
    'body': body,
    'commentdate':commentdate
  });
      Comment.addcomment(comment, function(err, comments){
        if(err) throw err;
        console.log(comments);
      });
      req.flash('success','Comment is added successfully');
      res.location('/posts/show/'+postid);
      res.redirect('/posts/show/'+postid);
  
  }
  
});




module.exports = router;
