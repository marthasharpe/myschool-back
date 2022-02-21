const mongoose = require("mongoose");

// import resource schema
const Resource = require("../models/resource");

exports.resourcesGetAll = (req, res, next) => {
  Resource.find({ userId: req.params.userId })
    .select("title description _id link subject dateCreated")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        resources: docs.map((doc) => {
          return {
            _id: doc._id,
            title: doc.title,
            description: doc.description,
            link: doc.link,
            subject: doc.subject,
            dateCreated: doc.dateCreated,
          };
        }),
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to get resources.",
        error,
      });
    });
};

exports.resourcesPostNew = (req, res, next) => {
  const resource = new Resource({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    subject: req.body.subject,
    dateCreated: Date.now(),
    userId: req.params.userId, // ref to user creating resource
  });
  resource
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Resource created.",
        createdResource: {
          _id: result._id,
          title: result.title,
          description: result.description,
          link: result.link,
          subject: result.subject,
          dateCreated: result.date,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to add resource.",
        error,
      });
    });
};

exports.resourcesGetById = (req, res, next) => {
  Resource.findById(req.params.resourceId)
    .exec()
    .then((resource) => {
      if (!resource) {
        return res.status(404).json({
          message: "Resource not found.",
        });
      }
      res.status(200).json({
        _id: resource._id,
        title: resource.title,
        description: resource.description,
        link: resource.link,
        subject: resource.subject,
        userId: result.userId,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong.",
        error,
      });
    });
};

exports.resourcesPutById = (req, res, next) => {
  Resource.findByIdAndUpdate(req.params.resourceId, req.body, { new: true })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Resource updated.",
        updatedResource: {
          _id: result._id,
          title: result.title,
          description: result.description,
          link: result.link,
          subject: result.subject,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong.",
        error,
      });
    });
};

exports.resourcesDeleteById = (req, res, next) => {
  Resource.findByIdAndDelete(req.params.resourceId)
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Resource removed.",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong.",
        error,
      });
    });
};
