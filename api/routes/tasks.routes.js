module.exports = app => {
    const tasks = require("../controllers/task.controller.js");
  
    var router = require("express").Router();
  
    router.post("/tasks/", tasks.create);
    router.get("/tasks/", tasks.findAll);
    router.get("/tasks/:id", tasks.findOne);
    router.put("/tasks/:id", tasks.update);
    router.delete("/tasks/:id", tasks.delete);
  
    app.use('/api', router);
};