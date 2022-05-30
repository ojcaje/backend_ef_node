module.exports = app => {
    const cliente = require("../controllers/clientedao.controller.js");
    var router = require("express").Router();
    router.post("/", cliente.create);
    router.get("/", cliente.findAll);
    router.get("/:id", cliente.findOne);
    router.get("/cedula/:cedula", cliente.findOneCedula);
    router.put('/:id', cliente.update);
    app.use('/api/cliente', router);
};

