const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  UserName:String,
  email: String,
  password: String
})

const user = mongoose.model("APIuserTable",userSchema);
module.exports = user;