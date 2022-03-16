const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
});

const PM = mongoose.model("Post", Post, "Post");

module.exports = PM;
