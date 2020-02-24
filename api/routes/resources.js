const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// import middleware to check authorization
const checkAuth = require('../middleware/checkAuth');

// import resource schema
const Resource = require('../models/resource')

// handle GET requests to /resources
router.get('/', checkAuth, (req, res, next) => {
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
            res.status(500).json(error)
        })
})

// handle POST requests to /resources
router.post('/', checkAuth, (req, res, next) => {
    // form of POST request
    const resource = new Resource({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        status: req.body.status,
        subject: req.body.subject,
    })
    resource
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Resource created.',
                createdResource: {
                    _id: result._id,
                    title: result.title,
                    description: result.description,
                    link: result.link,
                    status: result.status,
                    subject: result.subject,                   
                }
            });
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

// handle GET requests to /resources/:resourceId
router.get('/:resourceId', checkAuth, (req, res, next) => {
    Resource.findById(req.params.resourceId)
        .exec()
        .then(resource => {
            if (!resource) {
                return res.status(404).json({
                    message: 'Resource not found.'
                })
            }
            res.status(200).json({
                _id: resource._id,
                title: resource.title,
                description: resource.description,
                link: resource.link,
                status: resource.status,
                subject: resource.subject
            })
        })
        .catch(error => {
            res.status(500).json({ error })
        })
})

// handle PATCH requests to /resources/:resourceId
router.patch('/:resourceId', checkAuth, (req, res, next) => {
    const id = req.params.resourceId;
    const updateObject = req.body;
    Resource.update({ _id: id }, { $set: updateObject })
        .exec()
        .then(resource => {
            res.status(200).json({
                message: 'Resource updated',
                resource: {
                    title: resource.title,
                    description: resource.description,
                    link: resource.link,
                    status: resource.status,
                    subject: resource.subject
                }
            })
        })
        .catch(error => {
            res.status(500).json({error})
        })
})

// handle DELETE requests to /resources/:resourceId
router.delete('/:resourceId', checkAuth, (req, res, next) => {
    Resource.remove({ _id: req.params.resourceId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Resource removed.'
            })
        })
        .catch(error => {
            res.status(500).json({ error })
        })
})

module.exports = router;