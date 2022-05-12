const db = require("../models");
const Mesa = db.Mesa;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {

    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Ingrese el nombre"
        });
        return;
    }
    if (!req.body.posicion) {
        res.status(400).send({
            message: "Ingrese la posicion"
        });
        return;
    }
    if (!req.body.numero_planta) {
        res.status(400).send({
            message: "Ingrese el numero de planta"
        });
        return;
    }

    // crea una Mesa
    const mesa = {
        nombre: req.body.nombre,
        id_restaurante: req.body.id_restaurante,
        posicion: req.body.posicion,
        numero_planta: req.body.numero_planta
    };
    // Guardamos a la base de datos
    Mesa.create(mesa)
        .then(data => {
            console.log("se ha creado una Mesa", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear una Mesa."
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;
    Mesa.findByPk(id)
        .then(data => {
            console.log("Se ha hecho un get de: ", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener Mesa con id=" + id
            });
        });
};


exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { mesa: { [Op.iLike]: `%${nombre}%` } } : null;

    Mesa.findAll({ where: condition })
        .then(data => {
            console.log("Se ha hecho un get de las Mesas con nombre ", nombre, ":", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener las Mesas."
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;
    const condition = {id:id};
    Mesa.destroy({ where:condition })
        .then(data => {
            console.log("Se ha hecho un delete de la Mesa con id: ", id);
            res.status(200).send({
                message: "Éxito al borrar Mesa con id=" + id
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al borrar Mesa con id=" + id
            });
        });
};


exports.put = (req, res) => {
    const id = req.params.id;
    Mesa.update(
        {
            nombre: req.body.nombre,
            id_restaurante: req.body.id_restaurante,
            posicion: req.body.posicion,
            numero_planta: req.body.numero_planta
        },
        { returning: true, where: {id: id} }
    )
        .then(data => {
            console.log("Se ha hecho put de la Mesa: ", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al actualizar la Mesa."
            });
    });
};
