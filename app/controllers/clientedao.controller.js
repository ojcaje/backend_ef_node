const db = require("../models");
const Cliente = db.Cliente;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Ingrese el nombre"
        });
        return;
    }
    if (!req.body.cedula) {
        res.status(400).send({
            message: "Ingrese la cédula"
        });
        return;
    }
    if (!req.body.apellido) {
        res.status(400).send({
            message: "Ingrese el apellido"
        });
        return;
    }

    // crea un cliente
    const cliente = {
        nombre: req.body.nombre,
        cedula: req.body.cedula,
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
                    err.message || "Ha ocurrido un error al crear un cliente."
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;
    Cliente.findByPk(id)
        .then(data => {
            console.log("Se ha hecho un get de: ", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener cliente con id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    const cedula = req.query.cedula;

    var condition = (nombre||cedula) ? { [Op.or]: [
        {nombre: { [Op.iLike]: `%${nombre}%` }},
        db.sequelize.where(
            db.sequelize.cast(db.sequelize.col('Cliente.cedula'), 'varchar'),
            {[Op.iLike]: `%${cedula}%`}
        )
    ]} : null;

    Cliente.findAll({ where: condition })
        .then(data => {
            console.log("Se ha hecho un get de los clientes con nombre ", nombre, ":", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener los clientes."
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;
    const condition = {id:id};
    Cliente.destroy({ where:condition })
        .then(data => {
            console.log("Se ha hecho un delete del cliente con id: ", id);
            res.status(200).send({
                message: "Éxito al borrar cliente con id=" + id
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al borrar cliente con id=" + id
            });
        });
};


exports.put = (req, res) => {
    const id = req.params.id;
    Cliente.update(
        {
            nombre: req.body.nombre,
            cedula: req.body.cedula,
            apellido: req.body.apellido
        },
        { returning: true, where: {id: id} }
    )
        .then(data => {
            console.log("Se ha hecho put del cliente: ", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al actualizar el cliente."
            });
    });
};
