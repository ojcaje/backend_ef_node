const db = require("../models");
const Categoria = db.Categoria;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Debe ingresar el nombre de la categoria"
        });
        return;
    }
    // crea una categoría
    const categoria = {
        nombre: req.body.nombre
    };
    // Guardamos a la base de datos
    Categoria.create(categoria)
        .then(data => {
            console.log("se ha creado una categoria", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al guardar la categoría"
            });
        });
};

// encontrar por id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Categoria.findByPk(id)
        .then(data => {
            console.log("se ha buscado una categoría", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener categoría con id=" + id
            });
        });
};

// encontrar por nombre
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Categoria.findAll({ where: condition })
        .then(data => {
            console.log("se han buscado la categoría", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener los Restaurantes."
            });
        });
};

// actualizar categoría
exports.update = (req, res) => {
    const id = req.params.id;
  
    Categoria.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha actualizado la categoría con id ", id);
                res.send({
                    message: "La categoría se ha actualizado correctamente."
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo actualizar Restaurante con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando la categoría con id= " + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Categoria.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha borrado la categoría con id ", id);
                res.send({
                    message: "La categoría fue borrado correctamente!"
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo borrar la categoría con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error borrando la categoría con id= " + id
            });
        });
};
