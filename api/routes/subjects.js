const express = require('express');
const router = express.Router();

// import middleware to check authorization
const checkAuth = require('../middleware/checkAuth');

// import subject controller
const SubjectController = require('../controllers/subjects');

// handle GET requests to /subjects
router.get('/:userId', checkAuth, SubjectController.subjectsGetAll);

// handle POST requests to /subjects
router.post('/:userId', checkAuth, SubjectController.subjectsPostNew);

// handle GET requests to /subjects/:subjectId
router.get('/:userId/:subjectId', checkAuth, SubjectController.subjectsGetById);

// handle PATCH requests to /subjects/:subjectId
router.patch('/:userId/:subjectId', checkAuth, SubjectController.subjectsPatchById);

// handle DELETE requests to /subjects/:subjectId
router.delete('/:userId/:subjectId', checkAuth, SubjectController.subjectsDeleteById);

module.exports = router;