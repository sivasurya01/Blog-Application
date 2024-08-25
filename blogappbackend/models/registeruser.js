const mongoose = require("mongoose");
const RegisterUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const registerusermodel = mongoose.model("registeruser", RegisterUserSchema);
module.exports = registerusermodel;
