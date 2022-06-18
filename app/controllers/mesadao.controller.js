const db = require("../models");
const Mesa = db.Mesa;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.posicionx) {
        res.status(400).send({
            message: "Debe ingresar la posicion de la Mesa!"
        });
        return;
    }
    if (!req.body.posiciony) {
        res.status(400).send({
            message: "Debe ingresar la posicion de la Mesa!"
        });
        return;
    }
    if (!req.body.capacidad) {
        res.status(400).send({
            message: "Debe ingresar la capacidad de la Mesa!"
        });
        return;
    }
    // crea una mesa
    const mesa = {
        nombre: req.body.nombre,
        posicionx: req.body.posicionx,
        posiciony: req.body.posiciony,
        planta: req.body.planta,
        capacidad: req.body.capacidad,
        RestauranteId: req.body.RestauranteId
    };
    // Guardamos a la base de datos
    Mesa.create(mesa)
        .then(data => {
            console.log("se ha creado una mesa", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al guardar la Mesa."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Mesa.findByPk(id, {include: [
            {
                model: db.CabeceraConsumo, as: 'cabeceras_consumos',
                where: { estado: "abierto" },
                include: [
                    {model: db.Cliente, as: 'Cliente' },
                    {
                        model: db.DetalleConsumo, as: 'detalles_consumos',
                        include: [{model: db.Producto, as: 'Producto'}]
                    }
                ],
            }
        ]})
        .then(data => {
            console.log("se ha buscado una mesa", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err + ". Error al obtener mesa con id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const RestauranteId = req.query.restaurante;
    console.log(req.query);
    if(RestauranteId){
        var mesa = req.query.mesas;
        if(mesa){
            if (!Array.isArray(mesa)) {
                mesa=[mesa];
            }
            mesa = mesa.map(Number);
        }else{
            mesa = [];
        }
        Mesa.findAll({ include: ["Restaurante"], where: {id: {[Op.notIn]: mesa}, RestauranteId: RestauranteId},
            order: [
                ['planta', 'ASC'],
            ],
        })
            .then(data => {
                console.log("se han buscado las mesas", data);
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Ocurrio un error al obtener los Mesas."
                });
            });
    } else {
        const nombre = req.query.nombre;
        var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

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

    }
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    Mesa.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha actualizado la mesa con id", id);
                res.send({
                    message: "La Mesa se ha actualizado correctamente."
                });
            } else {
                res.send({
                    message: `Ocurrio un error. No se pudo actualizar Mesa con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando la Mesa con id= " + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Mesa.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha borrado la mesa con id ", id);
                res.send({
                    message: "La Mesa fue borrado correctamente!"
                });
            } else {
                res.send({
                    message: `Ocurrio un error. No se pudo borar la Mesa con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error borrando la Mesa con id= " + id
            });
        });
};
