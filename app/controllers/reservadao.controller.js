const db = require("../models");
const Reserva = db.Reserva;
const Op = db.Sequelize.Op;
/* var moment = require('moment'); 
moment().format('l');  */

exports.create = (req, res) => {
    // Validate request
    if (!req.body.RestauranteId) {
        res.status(400).send({
            message: "Debe ingresar el Restaurante de la Reserva!"
        });
        return;
    }
    if (!req.body.ClienteId) {
        res.status(400).send({
            message: "Debe ingresar el cliente que realiza la Reserva!"
        });
        return;
    }
    if (!req.body.rangohora) {
        res.status(400).send({
            message: "Debe ingresar el rango de horas de la Reserva!"
        });
        return;
    }
    // crea una Reserva
    const reserva = {
        nombre: req.body.nombre,
        fecha: req.body.fecha,
        rangohora: req.body.rangohora,
        cantidad: req.body.cantidad,
        RestauranteId: req.body.RestauranteId,
        MesaId: req.body.MesaId,
        ClienteId: req.body.ClienteId
    };
    // Guardamos a la base de datos
    Reserva.create(reserva)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al guardar la Reserva."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Reserva.findByPk(id, { include: ["Restaurante", "Mesa", "Cliente"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener reserva con id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const RestauranteId = req.query.restaurante;
    const fecha = req.query.fecha;
    console.log(req.query);
    var rangohora = req.query.horas;
    /* const mesa = JSON.parse(rangohora.split(" ").join(""));
    console.log(mesa);
    console.log(horas); */
    
    // var condition = RestauranteId ? { RestauranteId: { [Op.eq]: `${RestauranteId}` } } : null;
    // if (!condition) {
    //     const fecha = req.query.fecha;
    //     var condition = fecha ? { fecha: { [Op.eq]: `${fecha}` } } : null;
    // }
    // if (!condition) {
    //     const ClienteId = req.query.cliente;
    //     var condition = ClienteId ? { ClienteId: { [Op.eq]: `${ClienteId}` } } : null;
    // }
    var mesas = new Array();
    if (rangohora) {
        if (!Array.isArray(rangohora)) {
            rangohora=[rangohora];
        }
    }
    //     const horas = rangohora.map(Number);
        
        // Reserva.findAll({ include: ["Restaurante", "Mesa", "Cliente"], where: {rangohora: {[Op.in]: horas}, RestauranteId: RestauranteId, fecha: fecha},

        if(fecha){
            if(RestauranteId){
                var condition = (fecha||RestauranteId) ? { [Op.and]: [
                    {fecha:  `%${fecha}%` },
                    {RestauranteId:  RestauranteId },
                ]} : null;
            }else{
                var condition = fecha ? { fecha: { [Op.eq]: `%${fecha}%` } } : null;
            }
            
        }else{
            var condition = RestauranteId ? { RestauranteId: { [Op.eq]: RestauranteId } } : null;
        }
        

        Reserva.findAll({ include: ["Restaurante", "Mesa", "Cliente"], where: condition,
        order: [
                ['fecha', 'ASC'],
                ['MesaId', 'ASC'],
            ],
        })
        .then(data => {
            data.forEach(reseva => {
                mesas.push(reseva.MesaId);
            });
            console.log("mesas ocup: ", mesas);
            if(rangohora){
                res.send(mesas);
            }else{
            res.send(data);}
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los Reservas."
            });
        });
    // }else{
        // Reserva.findAll({ include: ["Restaurante", "Mesa", "Cliente"], where: condition,
        //         order: [
        //             ['rangohora', 'ASC'],
        //             ['MesaId', 'ASC'],
        //         ],
        //     })
        //     .then(data => {
        //         res.send(data);
        //     })
        //     .catch(err => {
        //         res.status(500).send({
        //             message:
        //                 err.message || "Ocurrio un error al obtener los Reservas."
        //         });
        //     });
    // }
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    Reserva.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La Reserva se ha actualizado correctamente."
                });
            } else {
                res.send({
                    message: `Ocurrio un error. No se pudo actualizar Reserva con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando la Reserva con id= " + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Reserva.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La Reserva fue borrada correctamente!"
                });
            } else {
                res.send({
                    message: `Ocurrio un error. No se pudo borar la Reserva con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error borrando la Reserva con id= " + id
            });
        });
};
