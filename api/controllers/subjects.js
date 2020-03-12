const mongoose = require('mongoose');

// import subject schema
const Subject = require('../models/subject');

exports.subjectsGetAll = (req, res, next) => {
    Subject.find({ userId: req.params.userId })
        .select('_id name') // only these fields
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                subjects: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                    }
                })
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Failed to get subjects.',
                error
            });
        })
}

exports.subjectsPostNew = (req, res, next) => {
    // new instance of Subject
    const subject = new Subject({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        userId: req.params.userId // ref to user creating subject
    })
    subject.save()
        .then(result => {
            res.status(201).json({
                message: 'subject created',
                newSubject: {
                    _id: result._id,
                    name: result.name,
                    userId: result.userId
                }
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Failed to add subject.',
                error
            })
        });
}

exports.subjectsGetById = (req, res, next) => {
    Subject.findById(req.params.subjectId)
        .select('_id name') // only these fields
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    _id: doc._id,
                    name: doc.name,
                    userId: result.userId           
                });
            } else {
                res.status(404).json({
                    message: 'subject not found'
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

exports.subjectsDeleteById = (req, res, next) => {
    Subject.findByIdAndDelete(req.params.subjectId)
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'subject deleted',
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Something went wrong.',
                error
            });
        })
}
