const express = require('express');
const router = express.Router();

// handle GET requests to /subjects
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling get requests to /subjects'
    })
})

// handle POST requests to /subjects
router.post('/', (req, res, next) => {
    // form of POST request
    const subject = {
        tab: req.body.tab,
    }
    res.status(201).json({
        message: 'Handling post requests to /subjects',
        subject,
    })
})

// handle GET requests to /subjects/:subjectId
router.get('/:subjectId', (req, res, next) => {
    res.status(200).json({
        message: 'Subject details',
        id: req.params.subjectId
    })
})

// handle PATCH requests to /subjects/:subjectId
router.patch('/:subjectId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated subject',
        id: req.params.subjectId
    })
})

// handle DELETE requests to /subjects/:subjectId
router.delete('/:subjectId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted subject',
        id: req.params.subjectId
    })
})

module.exports = router;