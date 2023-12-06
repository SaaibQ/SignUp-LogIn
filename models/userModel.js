const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "Please provide your full name"],
  },
  email: {
    type: String,
    required: [true, "Please provide the email address"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please provide the password"],
    // minlength: 8,
    select: false,
  },
  passwordConfirmed: {
    type: String,
    required: [true, "Please confirm the password"],
    // validate: {
    //   validator: function (val) {
    //     return this.password === val;
    //   },
    //   message: "Please re-confirm the password",
    // },
  },
});

// Document Mongoose Middleware: Encrypting password using 'bcrypt'
userSchema.pre("save", async function (next) {
  // only paramter we need to encrypt is password field
  if (!this.isModified("password")) {
    next();
    return;
  }
  this.password = await bcrypt.hash(this.password, 12);

  // does'nt need to save 'passConfirmed' field in DB
  this.passwordConfirmed = undefined;
});

// Instance method, available on all documents in users collection
userSchema.methods.correctPassword = async function (
  enteredPassword,
  userPassword
) {
  // console.log(enteredPassword, userPassword);
  return await bcrypt.compare(enteredPassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
