var mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeblog', {useNewUrlParser: true});
const db = mongoose.connection;
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name: {
      type: String,
  }});
  module.exports = mongoose.model('Category',categorySchema);

  module.exports.createcategory = (newcategory, callback) => {
    newcategory.save(callback);
};

