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
            console.log("se ha creado un cliente", data);
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
            console.log("se ha buscado un cliente", data);
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
                console.log("se ha buscado un cliente pero no existe");
                res.send(false);
            } else {
                console.log("se ha buscado un cliente que sí existe", data);
                res.send(true);
            }
            
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener cliente con cedula=" + cedula
            });
        });
};
exports.findAll = (req, res) => {
    const cedula = req.query.cedula;
    var condition = cedula ? { cedula: { [Op.iLike]: `%${cedula}%` } } : null;
    if (cedula) {
        Cliente.findAll({ where: {cedula:cedula} })
            .then(data => {
                console.log("se han buscado clientes", data);
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
            console.log("se han buscado clientes", data);
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
                console.log("se ha actualizado un cliente con id", id);
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
