const express = require("express");
const authenController = require("./../controllers/authenController");
const userController = require("./../controllers/userController");

const router = express.Router();

router.post("/signIn", authenController.signIn);
router.post("/logIn", authenController.logIn);

// router.route("/").get(userController.getAllUsers);

module.exports = router;
