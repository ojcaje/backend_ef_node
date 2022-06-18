module.exports = app => {
    const categoria = require("../controllers/categoriadao.controller.js");
    var router = require("express").Router();
    router.post("/", categoria.create); // crear categoría
    router.get("/", categoria.findAll); // encontrar categoría por nombre
    router.get("/:id", categoria.findOne); // encontrar categoría por id
    router.put('/:id', categoria.update); // actualizar categoría
    router.delete('/:id', categoria.delete);
    app.use('/api/categoria', router);
};
