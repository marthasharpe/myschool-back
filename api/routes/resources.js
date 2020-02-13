const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Resource = require('../models/resource')

// handle GET requests to /resources
router.get('/', (req, res, next) => {
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
router.post('/', (req, res, next) => {
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
router.get('/:resourceId', (req, res, next) => {
    res.status(200).json({
        message: 'Resource details',
        id: req.params.resourceId
    })
})

// handle PATCH requests to /resources/:resourceId
router.patch('/:resourceId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated resource',
        id: req.params.resourceId
    })
})

// handle DELETE requests to /resources/:resourceId
router.delete('/:resourceId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted resource',
        id: req.params.resourceId
    })
})

module.exports = router;