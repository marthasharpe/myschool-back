const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// import subject schema
const Subject = require('../models/subject');

// handle GET requests to /subjects
router.get('/', (req, res, next) => {
    Subject.find()
        .select('_id name') // only these fields
        .exec()
        .then(docs => {
            // specify format of response
            const response = {
                count: docs.length,
                subjects: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({error});
        })
})

// handle POST requests to /subjects
router.post('/', (req, res, next) => {
    // new instance of Subject
    const subject = new Subject({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    })
    subject
        .save()
        .then(result => {
            res.status(201).json({
                message: 'created new subject',
                newSubject: {
                    _id: result._id,
                    name: result.name,
                }
            })
        })
        .catch(error => {
            res.status(500).json({error})
        });
})

// handle GET requests to /subjects/:subjectId
router.get('/:subjectId', (req, res, next) => {
    const id = req.params.subjectId;
    Subject.findById(id)
        .select('_id name') // only these fields
        .exec()
        .then(doc => {
            if (doc) {
                // specify format of response
                const response = {
                    _id: doc._id,
                    name: doc.name,              
                }
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: 'No entry found for provided ID'
                });
            }
        })
        .catch(error => {
            res.status(500).json({error})
        })
})

// handle PATCH requests to /subjects/:subjectId
router.patch('/:subjectId', (req, res, next) => {
    const id = req.params.subjectId;
    const updateObject = req.body;
    Subject.update({ _id: id }, { $set: updateObject })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'subject updated',
                name: result.name
            })
        })
        .catch(error => {
            res.status(500).json({error})
        })
})

// handle DELETE requests to /subjects/:subjectId
router.delete('/:subjectId', (req, res, next) => {
    const id = req.params.subjectId;
    Subject.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'subject deleted',
            });
        })
        .catch(error => {
            res.status(500).json({error});
        })
})

module.exports = router;