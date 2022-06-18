module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("Producto", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING,
            unique: true
        },
        precio_venta: {
            type: Sequelize.INTEGER,
        }
    });
    return Producto;
};
