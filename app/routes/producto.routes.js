module.exports = app => {
    const producto = require("../controllers/productodao.controller.js");
    var router = require("express").Router();
    router.post("/", producto.create); // crear producto
    router.get("/", producto.findAll); // encontrar producto por nombre
    router.get("/:id", producto.findOne); // encontrar producto por id
    router.put('/:id', producto.update); // actualizar producto
    router.delete('/:id', producto.delete);
    app.use('/api/producto', router);
};
