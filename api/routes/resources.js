const express = require('express');
const router = express.Router();

// handle GET requests to /resources
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling get requests to /resources'
    })
})

// handle POST requests to /resources
router.post('/', (req, res, next) => {
    // form of POST request
    const resource = {
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        subject: req.body.subject,
        status: req.body.status,
    }
    res.status(201).json({
        message: 'Handling post requests to /resources',
        resource,
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