const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // package to encrypt/hash passwords
const jwt = require("jsonwebtoken"); // package to create web token

// import user schema
const User = require("../models/user");
// import other schemas to delete user documents
const Subject = require("../models/subject");
const Resource = require("../models/resource");

exports.userSignup = (req, res, next) => {
  // check if email is already taken
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email already exists.",
        });
      } else {
        // encrypt/hash password with salting
        bcrypt.hash(req.body.password, 10, (error, hash) => {
          if (error) {
            return res.status(500).json({
              message: "Something went wrong.",
              error,
            });
          } else {
            // create new user with email and password
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                //send verification email
                let userData = { email: result.email, userId: result._id };
                let token = jwt.sign(userData, process.env.JWT_KEY, {
                  expiresIn: "20h",
                });
                res.status(201).json({
                  message: "User created.",
                  token,
                  user: {
                    _id: result._id,
                  },
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: "Something went wrong.",
                  error,
                });
              });
          }
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.userLogin = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      // check if user email exists
      if (user.length < 1) {
        return res.status(401).json({
          message: "User not found.",
        });
      }
      // check if user password is correct
      bcrypt.compare(req.body.password, user[0].password, (error, result) => {
        if (error) {
          return res.status(401).json({
            message: "Incorrect credentials.",
          });
        }
        // bcrypt.compare returns true or false
        if (result) {
          let userData = { email: user[0].email, userId: user[0]._id };
          // create json web tokens
          let token = jwt.sign(userData, process.env.JWT_KEY, {
            expiresIn: "20h",
          });
          return res.status(200).json({
            message: "Login successful.",
            token,
            user: {
              userId: user[0]._id,
            },
          });
        }
        res.status(401).json({
          message: "Login failed.",
        });
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong.",
        error,
      });
    });
};

exports.userDelete = (req, res, next) => {
  Subject.deleteMany({ userId: req.params.userId }, (err) => {
    if (err) console.log(err);
    console.log("Subjects deleted.");
  });
  Resource.deleteMany({ userId: req.params.userId }, (err) => {
    if (err) console.log(err);
    console.log("Resources deleted.");
  });
  User.findByIdAndDelete(req.params.userId)
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted.",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong.",
        error,
      });
    });
};

exports.userGetById = (req, res, next) => {
  User.findById(req.params.userId)
    .select("email password") // only these fields
    .exec()
    .then((user) => {
      if (user) {
        res.status(200).json({
          email: user.email,
          password: user.password,
        });
      } else {
        res.status(404).json({
          message: "User not found.",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong.",
        error,
      });
    });
};
