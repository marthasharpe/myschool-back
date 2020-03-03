const mongoose = require('mongoose');

// import resource schema
const Resource = require('../models/resource');

exports.resourcesGetAll = (req, res, next) => {
    Resource.find()
        .select('title description _id link status subject')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                resources: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        description: doc.description,
                        link: doc.link,
                        status: doc.status,
                        subject: doc.subject
                    }
                })
            })
        })
        .catch(error => {
            res.status(500).json({ error })
        })
}

exports.resourcesPostNew = (req, res, next) => {
    // form of POST request
    const resource = new Resource({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        status: req.body.status,
        subject: req.body.subject,
        date: Date.now(),
        userId: req.params.userId // ref to user creating resource
    })
    resource
        .save()
        .then(result => {
            res.status(201).json({
                message: 'resource created',
                createdResource: {
                    _id: result._id,
                    title: result.title,
                    description: result.description,
                    link: result.link,
                    status: result.status,
                    subject: result.subject,
                    date: result.date,
                }
            });
        })
        .catch(error => {
            res.status(500).json({ error });
        })
}

exports.resourcesGetById = (req, res, next) => {
    Resource.findById(req.params.resourceId)
        .exec()
        .then(resource => {
            if (!resource) {
                return res.status(404).json({
                    message: 'resource not found'
                })
            }
            res.status(200).json({
                _id: resource._id,
                title: resource.title,
                description: resource.description,
                link: resource.link,
                status: resource.status,
                subject: resource.subject,
                userId: result.userId
            })
        })
        .catch(error => {
            res.status(500).json({ error })
        })
}

exports.resourcesPutById = (req, res, next) => {
    Resource.findByIdAndUpdate(req.params.resourceId, req.body, {new: true})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'resource updated',
                updatedResource: {
                    _id: result._id,
                    title: result.title,
                    description: result.description,
                    link: result.link,
                    status: result.status,
                    subject: result.subject,
                }
            })
        })
        .catch(error => {
            res.status(500).json({ error })
        })
}

exports.resourcesDeleteById = (req, res, next) => {
    Resource.remove({ _id: req.params.resourceId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'resource removed'
            })
        })
        .catch(error => {
            res.status(500).json({ error })
        })
}