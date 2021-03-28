module.exports = app => {
    const mobiles = require("../controllers/controller.js");
  
    var router = require("express").Router();

    app.use('/api/tutorials', router);

    // Create a new Mobile
    router.post("/", mobiles.create);
  
    // Retrieve all Mobiles
    router.get("/", mobiles.findAll);
  
    // Retrieve a single Mobile with id
    router.get("/:id", mobiles.findOne);
  
    // Update a Mobile with id
    router.put("/:id", mobiles.update);
  
    // Delete a Mobile with id
    router.delete("/:id", mobiles.delete);
  
    // Delete a Mobile
    router.delete("/", mobiles.deleteAll);
  
  };