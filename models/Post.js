const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeblog', {useNewUrlParser: true});
const db = mongoose.connection;
const Schema = mongoose.Schema;
const postSchema = new Schema({
  title: {
    type: String,
},
category: {
    type: String
},
author: {
    type: String
},
body: {
  type:String
},
date:{
  type:Date
},
mainimage:{
  type:String
}
});

module.exports = mongoose.model('Post', postSchema);

 module.exports.createPost = (newPost, callback) => {
    newPost.save(callback);
};

