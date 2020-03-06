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
                        return res.status(500).json({
                            message: 'Something went wrong.',
                            error
                        })
                    } else {
                        // create new user with email and password
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash
                        })  
                        user.save()
                            .then(result => {
                                // create json web token
                                let token = jwt.sign(
                                    {
                                        email: result.email,
                                        userId: result._id
                                    },
                                    process.env.JWT_KEY,
                                    {
                                        expiresIn: "10h"
                                    }
                                )
                                res.status(201).json({
                                    message: "user created",
                                    token,
                                    user: {
                                        _id: result._id,
                                        firstName: result.firstName,
                                        lastName: result.lastName,
                                        email: result.email,
                                        password: result.password
                                    }
                                })
                            })
                            .catch(error => {
                                res.status(500).json({
                                    message: 'Something went wrong',
                                    error
                                })
                            });         
                    }
                })
            }
        })
        .catch(error => {
            res.status(500).json({ error })
        })
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
                    let token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "10h"
                        }
                    )
                    return res.status(200).json({
                        message: 'Auth successful',
                        token,
                        user: {
                            firstName: user[0].firstName,
                            lastName: user[0].lastName,
                            email: user[0].email,
                            password: user[0].password,
                            userId: user[0]._id,
                        }
                    })
                }
                res.status(401).json({
                    message: 'Auth failed'
                })        
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Something went wrong.',
                error
            });
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
            res.status(500).json({
                message: 'Something went wrong.',
                error
            });
        });
}

exports.userGetById = (req, res, next) => {
    const id = req.params.userId;
    User.findById({ _id: id })
        .select('email password') // only these fields
        .exec()
        .then(user => {
            if (user) {
                res.status(200).json({
                    email: user.email,
                    password: user.password           
                });
            } else {
                res.status(404).json({
                    message: 'user not found'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Something went wrong.',
                error
            })
        })
}