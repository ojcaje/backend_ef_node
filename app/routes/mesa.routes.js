module.exports = app => {
    const mesa = require("../controllers/mesadao.controller.js");
    var router = require("express").Router();
    router.post("/", mesa.create);
    router.get("/", mesa.findAll);
    router.get("/:id", mesa.findOne);
    router.delete("/:id", mesa.delete);
    router.put("/:id", mesa.put);
    app.use('/api/mesa', router);
};
