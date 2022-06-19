const cabecera_consumo = require("../controllers/cabecera_consumodao.controller");
module.exports = app => {
    const cabecera_consumo = require("../controllers/cabecera_consumodao.controller.js");
    var router = require("express").Router();
    router.put('/cerrar/', cabecera_consumo.cerrar); // cerrar cabecera_consumo
    router.post("/", cabecera_consumo.create); // crear cabecera_consumo
    router.get("/", cabecera_consumo.findAll); // encontrar cabecera_consumo (de manera opcional cada uno) por MesaId, ClienteId, estado
    router.get("/:id", cabecera_consumo.findOne); // encontrar cabecera_consumo por id
    router.put('/:id', cabecera_consumo.update); // actualizar cabecera_consumo
    router.delete('/:id', cabecera_consumo.delete);
    app.use('/api/cabecera_consumo', router);
};
