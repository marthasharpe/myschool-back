const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // package to encrypt/hash passwords

// import user schema
const User = require('../models/user');

// user signup
router.post('/signup', (req, res, next) => {
    // encrypt hash password with salting
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (err) {
            return res.status(500).json({error})
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            })  
            user
                .save()
                .then(result => {
                    res.status(201).json({
                        message: "User created."
                    })
                })
                .catch(error => {
                    res.status(500).json({error})
                });         
        }
    })
})

module.exports = router;