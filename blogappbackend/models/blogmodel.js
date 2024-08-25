const mongoose = require("mongoose");
const blogModel = mongoose.Schema({
  title: String,
  description: String,
  image: String,
});
const blogappmodel = new mongoose.model("blogs", blogModel);
module.exports = blogappmodel;
