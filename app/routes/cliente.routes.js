module.exports = app => {
    const cliente = require("../controllers/clientedao.controller.js");
    var router = require("express").Router();
    router.post("/", cliente.create);
    router.get("/", cliente.findAll);
    router.get("/:id", cliente.findOne);
    router.delete("/:id", cliente.delete);
    router.get("/cedula/:cedula", cliente.findOneCedula);
    router.put("/:id", cliente.put);
    app.use('/api/cliente', router);
};
