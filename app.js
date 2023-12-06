const express = require("express");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const morgan = require("morgan");
const globalErrorMiddleware = require("./controllers/errorController");

const app = express();

// To load static assets
app.use(express.static("public"));

app.use(express.json());
app.use("/api/user", userRouter);

// Global Error Middleware
app.use(globalErrorMiddleware);

module.exports = app;
