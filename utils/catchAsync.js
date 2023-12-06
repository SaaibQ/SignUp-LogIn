const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.log(`ERROR🛑: ${err.message}`);
      next(err);
    });
  };
};

module.exports = catchAsync;
