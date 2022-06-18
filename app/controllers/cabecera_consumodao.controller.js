const db = require("../models");
const CabeceraConsumo = db.CabeceraConsumo;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.estado) {
        res.status(400).send({
            message: "Debe ingresar el estado"
        });
        return;
    }
    if (req.body.estado != 'abierto' && req.body.estado != 'cerrado') {
        res.status(400).send({
            message: "Error. El estado puede ser sólo 'abierto' o 'cerrado'"
        });
        return;
    }
    if (!req.body.MesaId) {
        res.status(400).send({
            message: "Debe ingresar el id de la mesa"
        });
        return;
    }
    if (!req.body.ClienteId) {
        res.status(400).send({
            message: "Debe ingresar el id del cliente"
        });
        return;
    }
    // crea una cabecera_consumo
    const cabecera_consumo = {
        estado: req.body.estado,
        MesaId: req.body.MesaId,
        ClienteId: req.body.ClienteId,
        total: req.body.total ? req.body.total : 0,
        fecha_y_hora_creacion: req.body.fecha_y_hora_creacion,
        fecha_y_hora_cierre: req.body.fecha_y_hora_cierre
    };
    // Guardamos a la base de datos
    CabeceraConsumo.create(cabecera_consumo)
        .then(data => {
            console.log("se ha creado una cabecera_consumo", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al guardar la cabecera_consumo"
            });
        });
};

// encontrar por id
exports.findOne = (req, res) => {
    const id = req.params.id;
    CabeceraConsumo.findByPk(id, {
        include: [
            {
                model: db.DetalleConsumo, as: 'detalles_consumos',
                include: [{model: db.Producto, as: 'Producto'}]
            },
            {
                model: db.Cliente, as: 'Cliente'
            }
        ]})
        .then(data => {
            console.log("se ha buscado una cabecera_consumo", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err + ". Error al obtener cabecera_consumo con id=" + id
            });
        });
};

// encontrar (de manera opcional cada uno) por MesaId, ClienteId, estado
exports.findAll = (req, res) => {
    const mesa_id = req.query.MesaId;
    const cliente_id = req.query.ClienteId;
    const estado = req.query.estado;

    var condition = null;

    if(mesa_id){
        condition = { MesaId: mesa_id };
    }
    if(cliente_id){
        condition = { ClienteId: cliente_id };
    }
    if(estado){
        condition = { estado: estado };
    }

    if(mesa_id && cliente_id){
        condition = { [Op.and]: [
                {MesaId:  mesa_id },
                {ClienteId:  cliente_id },
            ]};
    }
    if(mesa_id && estado){
        condition = { [Op.and]: [
                {MesaId:  mesa_id },
                {estado:  estado },
            ]};
    }
    if(cliente_id && estado){
        condition = { [Op.and]: [
                {ClienteId:  cliente_id },
                {estado:  estado },
            ]};
    }
    if(mesa_id && cliente_id && estado){
        condition = { [Op.and]: [
                {MesaId:  mesa_id },
                {ClienteId:  cliente_id },
                {estado:  estado },
            ]};
    }

    CabeceraConsumo.findAll({ include: [
            {
                model: db.DetalleConsumo, as: 'detalles_consumos',
                include: [{model: db.Producto, as: 'Producto'}]
            },
            {
                model: db.Cliente, as: 'Cliente'
            }],
        where: condition })
        .then(data => {
            console.log("se han buscado las cabeceras", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener las Cabeceras."
            });
        });
};

// actualizar cabecera
exports.update = (req, res) => {
    const id = req.params.id;
  
    CabeceraConsumo.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha actualizado la cabecera con id ", id);
                res.send({
                    message: "La cabecera se ha actualizado correctamente."
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo actualizar Cabecera con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando la cabecera con id= " + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    CabeceraConsumo.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha borrado la cabecera con id ", id);
                res.send({
                    message: "La cabecera fue borrada correctamente!"
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo borrar la cabecera con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error borrando la categoría con id= " + id
            });
        });
};
