const express = require("express");
const router = express.Router();

// import middleware to check authorization
const checkAuth = require("../middleware/checkAuth");

// import user controller
const UserController = require("../controllers/users");

// handle POST requests to users/signup
router.post("/signup", UserController.userSignup);

// handle POST requests to users/login
router.post("/login", UserController.userLogin);

// handle POST requests to users/token
router.post("/refreshtoken", UserController.userRefreshToken);

// handle DELETE requests to users/:userId
router.delete("/:userId", checkAuth, UserController.userDelete);

// handle GET requests to users/:userId
router.get("/:userId", checkAuth, UserController.userGetById);

module.exports = router;
