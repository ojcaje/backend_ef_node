const db = require("../models");
const Cliente = db.Cliente;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.cedula) {
        res.status(400).send({
            message: "Debe ingresar el cedula de el Cliente!"
        });
        return;
    }
    // crea un Cliente
    const cliente = {
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido
    };
    // Guardamos a la base de datos
    Cliente.create(cliente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al guardar el cliente."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Cliente.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener venta con id=" + id
            });
        });
};
exports.findOneCedula = (req, res) => {
    const cedula = req.params.cedula;
    Cliente.findAll({where: {cedula: cedula}})
        .then(data => {
            if (data.length===0) {
                res.send(false);
            } else {
                res.send(true);
            }
            
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener venta con cedula=" + cedula
            });
        });
};
exports.findAll = (req, res) => {
    const cedula = req.query.cedula;
    var condition = cedula ? { cedula: { [Op.iLike]: `%${cedula}%` } } : null;
    if (cedula) {
        Cliente.findAll({ where: {cedula:cedula} })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrio un error al obtener los Clientes."
                });
            });
    } else {
        Cliente.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los Clientes."
            });
        });
    }
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    Cliente.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Cliente se ha actualizado correctamente."
                });
            } else {
                res.send({
                    message: `Ocurrio un error. No se pudo actualizar Cliente con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando el Cliente con id= " + id
            });
        });
};
