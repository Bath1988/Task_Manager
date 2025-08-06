module.exports = app => {
    const phones = require("../controllers/phone.controller.js");
  
    var router = require("express").Router();
  
    //router.post("/phones/", phones.create);
    router.post("/phones/", phones.create);
  
    router.get("/phones/", phones.findAll);
  
    router.get("/phones/:id", phones.findOne);
  
    router.put("/phones/:id", phones.update);
  
    router.delete("/phones/:id", phones.delete);
  
    app.use('/api', router);
};