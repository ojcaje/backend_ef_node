const db = require("../models");
const Restaurante = db.Restaurante;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Debe ingresar el nombre del Restaurante!"
        });
        return;
    }
    // crea un restaurante
    const restaurante = {
        nombre: req.body.nombre,
        direccion: req.body.direccion
    };
    // Guardamos a la base de datos
    Restaurante.create(restaurante)
        .then(data => {
            console.log("se ha creado un restaurant", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al guardar el restaurante."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Restaurante.findByPk(id)
        .then(data => {
            console.log("se ha buscado un restaurant", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener venta con id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Restaurante.findAll({ where: condition })
        .then(data => {
            console.log("se han buscado unos restaurants", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los Restaurantes."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    Restaurante.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha actualizado el restaurant con id ", id);
                res.send({
                    message: "El Restaurante se ha actualizado correctamente."
                });
            } else {
                res.send({
                    message: `Ocurrio un error. No se pudo actualizar Restaurante con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando el Restaurante con id= " + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Restaurante.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha borrado el restaurant con id ", id);
                res.send({
                    message: "El Restaurante fue borrado correctamente!"
                });
            } else {
                res.send({
                    message: `Ocurrio un error. No se pudo borar el Restaurante con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error borrando el Restaurante con id= " + id
            });
        });
};

exports.findRestauranteById = (restauranteId) => {
    console.log("se ha buscado el restaurante con id ", id);
    return Restaurante.findByPk(restauranteId, { include: ["mesas"] })
        .then((restaurante) => {
            return restaurante;
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener el Restaurante."
        });
    });
  };
