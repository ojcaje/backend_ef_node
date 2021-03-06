const db = require("../models");
const Reserva = db.Reserva;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
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
            console.log("se ha creado una reserva", data);
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
            console.log("se ha buscado una reserva", data);
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
    
    var mesas = new Array();
    if (rangohora) {
        if (!Array.isArray(rangohora)) {
            rangohora=[rangohora];
        }
    }

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
                console.log("se han buscado unas reservas", data);
                res.send(mesas);
            }else{
                console.log("se han buscado unas reservas", data);
                res.send(data);}
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los Reservas."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    Reserva.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha actualizado la reserva con id", id);

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
                console.log("se ha borrado la reserva con id", id);
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
