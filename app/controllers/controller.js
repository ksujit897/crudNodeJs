const db = require("../models");
const Mobile = db.mobiles;

// Create and Save new Mobile
exports.create = (req, res) => {
    // Validate request
    if (!req.body.brand) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create Mobile
    const mobile = new Mobile({
      brand: req.body.brand,
      model: req.body.model,
      battery: req.body.battery,
      colour: req.body.author
    });
  
    // Save Mobile Details in the database
    mobile
      .save(mobile)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while Saving Mobile Details."
        });
      });
  };

// Retrieve all Mobile Details from the database.
exports.findAll = (req, res) => {
    const brand = req.query.brand;
    var condition = brand ? { brand: { $regex: new RegExp(brand), $options: "i" } } : {};
  
    Mobile.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Mobile Details."
        });
      });
  };

// Find a single Mobile with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Mobile.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Mobile with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Mobile with id=" + id });
      });
  };

// Update Mobile Details by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Mobile.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Mobile Detail with id=${id}. Maybe Mobile Detail was not found!`
          });
        } else res.send({ message: "Mobile Detail was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Mobile Detail with id=" + id
        });
      });
  };

// Delete a Mobile with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Mobile.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Mobile with id=${id}. Maybe Mobile was not found!`
          });
        } else {
          res.send({
            message: "Mobile was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Mobile with id=" + id
        });
      });
  };

// Delete all Mobile Details from the database.
exports.deleteAll = (req, res) => {
    Mobile.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Mobile Details were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Mobile Details."
        });
      });
  };
  