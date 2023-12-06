const sendDevError = function (err, res) {
  console.log("DEV ERROR!");
  // console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProdError = function (err, res) {
  console.log("PROD ERROR!");
  if (err.isOperationalError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // console.log("ERROR!!!");
    res.status(500).json({
      status: "Fail",
      message: `${err.errors.email || "Something went wrong!"}`,
    });
  }
};

const globalErrorMiddleware = function (err, req, res, next) {
  console.log("Global Error Middleware");
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else {
    sendProdError(err, res);
  }
};

module.exports = globalErrorMiddleware;
