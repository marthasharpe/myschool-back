const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // package to encrypt/hash passwords
const jwt = require('jsonwebtoken'); // package to create web token

// import user schema
const User = require('../models/user');

exports.userSignup = (req, res, next) => {
    // check if email is already taken
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "email already exists"
                })
            } else {
                // encrypt/hash password with salting
                bcrypt.hash(req.body.password, 10, (error, hash) => {
                    if (error) {
                        return res.status(500).json({error})
                    } else {
                        // create new user with email and password
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })  
                        user
                            .save()
                            .then(result => {
                                res.status(201).json({
                                    message: "user created"
                                })
                            })
                            .catch(error => {
                                res.status(500).json({error})
                            });         
                    }
                })
            }
        });

}

exports.userLogin = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            // check if user email exists
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            // check if user password is correct
            bcrypt.compare(req.body.password, user[0].password, (error, result) => {
                if (error) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })                   
                }
                // bcrypt.compare returns true or false
                if (result) {
                    // create json web token
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userID: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    )
                    return res.status(200).json({
                        message: 'Auth successful',
                        token
                    })
                }
                res.status(401).json({
                    message: 'Auth failed'
                })        
            })
        })
        .catch(error => {
            res.status(500).json({error});
        });
}

exports.userDelete = (req, res, next) => {
    User.remove({_id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "user deleted"
            })
        })
        .catch(error => {
            res.status(500).json({error});
        });
}