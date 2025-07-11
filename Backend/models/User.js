const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: { type: String, unique: true },
  contacts: [{ name: String, phoneNumber: String }],
});
const User= mongoose.model("User", userSchema);
module.exports =User
