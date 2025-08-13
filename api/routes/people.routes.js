module.exports = app => {
    const people = require("../controllers/people.controller.js");
  
    var router = require("express").Router();
  
    router.get("/people/latest", people.findLatest);
    router.get("/people/:personId(\\d+)", people.findOne);
    router.put("/people/:personId", people.update);
    router.post("/people/", people.create);
    router.get("/people/", people.findAll);
    router.delete("/people/:id", people.delete);
  
    app.use('/api', router);
};