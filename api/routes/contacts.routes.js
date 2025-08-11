module.exports = app => {
    const contacts = require("../controllers/contact.controller.js");
  
    var router = require("express").Router();
  
    router.get("/contacts/latest", contacts.findLatest);

    router.get("/contacts/:contactId(\\d+)", contacts.findOne);

    router.put("/contacts/:contactId", contacts.update);

    router.post("/contacts/", contacts.create);
  
    router.get("/contacts/", contacts.findAll);
  
    router.delete("/contacts/:id", contacts.delete);
  
    app.use('/api', router);
};