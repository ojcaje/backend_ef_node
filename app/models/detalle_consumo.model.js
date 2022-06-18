module.exports = (sequelize, Sequelize) => {
    const DetalleConsumo = sequelize.define("DetalleConsumo", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return DetalleConsumo;
};
