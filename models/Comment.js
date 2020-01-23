const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeblog', {useNewUrlParser: true});
const db = mongoose.connection;
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
  },
  name: {
      type: String
  },
  email: {
      type: String
  },
  body: {
    type:String
  },
  commentdate:{
    type:Date
  },
  });
  
  module.exports = mongoose.model('Comment', commentSchema);

  module.exports.addcomment = (comment, callback) => {
    comment.save(callback);
};