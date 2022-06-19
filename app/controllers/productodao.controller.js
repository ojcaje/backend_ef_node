const db = require("../models");
const Producto = db.Producto;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Debe ingresar el nombre del producto"
        });
        return;
    }
    if (!req.body.precio_venta) {
        res.status(400).send({
            message: "Debe ingresar el precio de venta"
        });
        return;
    }
    // crea un producto
    const producto = {
        nombre: req.body.nombre,
        CategoriaId: req.body.CategoriaId,
        precio_venta: req.body.precio_venta
    };
    // Guardamos a la base de datos
    Producto.create(producto)
        .then(data => {
            console.log("se ha creado un producto", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al guardar el producto"
            });
        });
};

// encontrar por id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Producto.findByPk(id)
        .then(data => {
            console.log("se ha buscado un producto", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener producto id=" + id
            });
        });
};

// encontrar por nombre
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Producto.findAll({ include: [{model: db.Categoria, as: 'Categoria'}], where: condition })
        .then(data => {
            console.log("se han buscado un producto", data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener los Productos."
            });
        });
};

// actualizar producto
exports.update = (req, res) => {
    const id = req.params.id;
  
    Producto.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha actualizado el producto con id ", id);
                res.send({
                    message: "El producto se ha actualizado correctamente."
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo actualizar Producto con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando el producto con id= " + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Producto.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                console.log("se ha borrado el producto con id ", id);
                res.send({
                    message: "El producto fue borrado correctamente!"
                });
            } else {
                res.send({
                    message: `Ocurrió un error. No se pudo borrar el producto con id= ${id}.!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error borrando el producto con id= " + id
            });
        });
};
