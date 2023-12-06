const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");

const generate_jwt_token = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signIn = catchAsync(async function (req, res, next) {
  if (req.body.name === "" || req.body.email === "")
    throw new AppError("Please do fill all the fields ", 400);

  const emailUnique = await User.findOne({ email: req.body.email });
  // console.log(emailUnique);
  if (emailUnique?.email === req.body.email)
    throw new AppError("Please enter your valid email address", 400);

  if (req.body.password.length <= 8)
    throw new AppError(
      "Please enter password with more than 8 characters",
      400
    );

  if (req.body.password !== req.body.passwordConfirmed)
    throw new AppError("Please re-confirm your password", 400);

  const user = await User.create({
    user: req.body.user,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmed: req.body.passwordConfirmed,
  });
  // console.log(user);

  const jwt_token = generate_jwt_token(user._id);

  res.status(201).json({ status: "Success", jwt_token, data: { user } });
});

exports.logIn = catchAsync(async function (req, res, next) {
  // console.log(req.body);
  const { email: user_email, password: user_password } = req.body;
  // console.log(user_email, user_password);

  // 1) Check if email and password exist
  if (!user_email || !user_password) {
    return new AppError("Please enter both the fields email and pasword", 400);
  }

  //   2)To check whether user exists in the DB
  const user = await User.findOne({ email: user_email }).select("+password");

  //   To check password is correct and whether user exists in the DB
  if (!user || !(await user.correctPassword(user_password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  //   3)If everything is ok, then send the jwt token within response obj
  const token = generate_jwt_token(user._id);
  return res.status(200).json({ status: "Success", token, user });
});
