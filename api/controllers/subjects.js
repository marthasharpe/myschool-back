const mongoose = require('mongoose');

// import subject schema
const Subject = require('../models/subject');

exports.subjectsGetAll = (req, res, next) => {
    Subject.find()
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
            res.status(500).json({error});
        })
}

exports.subjectsPostNew = (req, res, next) => {
    // new instance of Subject
    const subject = new Subject({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    })
    subject
        .save()
        .then(result => {
            res.status(201).json({
                message: 'subject created',
                newSubject: {
                    _id: result._id,
                    name: result.name,
                }
            })
        })
        .catch(error => {
            res.status(500).json({error})
        });
}

exports.subjectsGetById = (req, res, next) => {
    const id = req.params.subjectId;
    Subject.findById(id)
        .select('_id name') // only these fields
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    _id: doc._id,
                    name: doc.name,              
                });
            } else {
                res.status(404).json({
                    message: 'subject not found'
                });
            }
        })
        .catch(error => {
            res.status(500).json({error})
        })
}

exports.subjectsPatchById = (req, res, next) => {
    const id = req.params.subjectId;
    const updateObject = req.body;
    Subject.update({ _id: id }, { $set: updateObject })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'subject updated'
            })
        })
        .catch(error => {
            res.status(500).json({error})
        })
}

exports.subjectsDeleteById = (req, res, next) => {
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
}
