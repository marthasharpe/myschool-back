const express = require('express');
const router = express.Router();

// import middleware to check authorization
const checkAuth = require('../middleware/checkAuth');

// import resource controller
const ResourceController = require('../controllers/resources');

// handle GET requests to /resources
router.get('/', checkAuth, ResourceController.resourcesGetAll);

// handle POST requests to /resources
router.post('/', checkAuth, ResourceController.resourcesPostNew);

// handle GET requests to /resources/:resourceId
router.get('/:resourceId', checkAuth, ResourceController.resourcesGetById);

// handle PATCH requests to /resources/:resourceId
router.patch('/:resourceId', checkAuth, ResourceController.resourcesPatchById);

// handle DELETE requests to /resources/:resourceId
router.delete('/:resourceId', checkAuth, ResourceController.resourcesDeleteById);

module.exports = router;