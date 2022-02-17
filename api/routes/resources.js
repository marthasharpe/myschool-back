const express = require("express");
const router = express.Router();

// import middleware to check authorization
const checkAuth = require("../middleware/checkAuth");

// import resource controller
const ResourceController = require("../controllers/resources");

// handle GET requests to /resources
router.get("/:userId", checkAuth, ResourceController.resourcesGetAll);

// handle POST requests to /resources
router.post("/:userId", checkAuth, ResourceController.resourcesPostNew);

// handle GET requests to /resources/:resourceId
router.get(
  "/:userId/:resourceId",
  checkAuth,
  ResourceController.resourcesGetById
);

// handle PATCH requests to /resources/:resourceId
router.put(
  "/:userId/:resourceId",
  checkAuth,
  ResourceController.resourcesPutById
);

// handle DELETE requests to /resources/:resourceId
router.delete(
  "/:userId/:resourceId",
  checkAuth,
  ResourceController.resourcesDeleteById
);

module.exports = router;
