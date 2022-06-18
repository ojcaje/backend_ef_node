const db = require("../models");
const DetalleConsumo = db.DetalleConsumo;
const CabeceraConsumo = db.CabeceraConsumo;
const Producto = db.Producto;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {
    // Validate request
    if (!req.body.cantidad) {
        res.status(400).send({
            message: "Debe ingresar la cantidad"
        });
        return;
    }
    // crea un detalle_consumo
    const detalle_consumo = {
        ProductoId: req.body.ProductoId,
        CabeceraConsumoId: req.body.CabeceraConsumoId,
        cantidad: req.body.cantidad
    };
    // Guardamos a la base de datos
    try {
        const data = await db.sequelize.transaction(async function (transaction) {
            // crear el detalle_consumo
            const nuevo_detalle_consumo = await DetalleConsumo.create(detalle_consumo, {transaction});

            // actualizar la cabecera con el nuevo total
            const producto = await Producto.findByPk(req.body.ProductoId);
            const cabecera_consumo = await CabeceraConsumo.findByPk(req.body.CabeceraConsumoId);
            const datos_actualizados = await cabecera_consumo.increment(
                'total', {by: req.body.cantidad * producto.precio_venta}
            );

            return nuevo_detalle_consumo;
        });

        console.log("se ha creado un detalle_consumo", data);
        res.send(data);

    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al crear detalle_consumo"
        });
    }

};

// encontrar por id
exports.findOne = (req, res) => {
    const id = req.params.id;
    DetalleConsumo.findByPk(id)
        .then(data => {
            console.log("se ha buscado un detalle_consumo", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener detalle_consumo con id=" + id
            });
        });
};

// encontrar (de manera opcional cada uno) por ProductoId, CabeceraConsumoId
exports.findAll = (req, res) => {
    const producto_id = req.query.ProductoId;
    const cabecera_id = req.query.CabeceraConsumoId;

    var condition = null;

    if(producto_id){
        condition = { ProductoId: producto_id };
    }
    if(cabecera_id){
        condition = { CabeceraConsumoId: cabecera_id };
    }

    if(producto_id && cabecera_id){
        condition = { [Op.and]: [
                {ProductoId:  producto_id },
                {CabeceraConsumoId:  cabecera_id },
            ]};
    }

    DetalleConsumo.findAll({ where: condition })
        .then(data => {
            console.log("se han buscado los detalles", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener los detalles"
            });
        });
};

// actualizar detalle
exports.update = (req, res) => {
    const id = req.params.id;
  
    DetalleConsumo.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha actualizado el detalle consumo con id ", id);
                res.send({
                    message: "El detalle_consumo se ha actualizado correctamente."
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo actualizar detalle_consumo con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando el detalle_consumo con id= " + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    DetalleConsumo.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha borrado el detalle con id ", id);
                res.send({
                    message: "El detalle fue borrado correctamente!"
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo borrar el detalle con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error borrando el detalle con id= " + id
            });
        });
};
