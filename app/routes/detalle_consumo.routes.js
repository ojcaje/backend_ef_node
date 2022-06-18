module.exports = app => {
    const detalle_consumo = require("../controllers/detalle_consumodao.controller.js");
    var router = require("express").Router();
    router.post("/", detalle_consumo.create); // crear detalle_consumo
    router.get("/", detalle_consumo.findAll); // encontrar detalle_consumo (de manera opcional cada uno) por ProductoId, CabeceraConsumoId
    router.get("/:id", detalle_consumo.findOne); // encontrar detalle_consumo por id
    router.put('/:id', detalle_consumo.update); // actualizar detalle_consumo
    router.delete('/:id', detalle_consumo.delete);
    app.use('/api/detalle_consumo', router);
};
