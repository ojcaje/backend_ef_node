const db = require("../models");
const Restaurant = db.Restaurant;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {

    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Ingrese el nombre"
        });
        return;
    }
    if (!req.body.direccion) {
        res.status(400).send({
            message: "Ingrese la dirección"
        });
        return;
    }

    // crea una restaurant
    const restaurant = {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
    };
    // Guardamos a la base de datos
    Restaurant.create(restaurant)
        .then(data => {
            console.log("se ha creado un restaurant", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear un restaurante."
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;
    Restaurant.findByPk(id)
        .then(data => {
            console.log("Se ha hecho un get de: ", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener restaurant con id=" + id
            });
        });
};


exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { restaurant: { [Op.iLike]: `%${nombre}%` } } : null;

    Restaurant.findAll({ where: condition })
        .then(data => {
            console.log("Se ha hecho un get de los restaurant con nombre ", nombre, ":", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener los restaurantes."
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;
    const condition = {id:id};
    Restaurant.destroy({ where:condition })
        .then(data => {
            console.log("Se ha hecho un delete del restaurant con id: ", id);
            res.status(200).send({
                message: "Éxito al borrar restaurant con id=" + id
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al borrar restaurant con id=" + id
            });
        });
};


exports.put = (req, res) => {
    const id = req.params.id;
    Restaurant.update(
        { nombre: req.body.nombre, direccion: req.body.direccion },
        { returning: true, where: {id: id} }
    )
        .then(data => {
            console.log("Se ha hecho put del restaurante: ", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al actualizar el restaurante."
            });
    });
};
