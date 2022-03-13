const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const People = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

const PI = mongoose.model("People", People, "People");

module.exports = PI;
