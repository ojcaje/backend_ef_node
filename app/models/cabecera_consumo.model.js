const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const CabeceraConsumo = sequelize.define("CabeceraConsumo", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        estado: { // puede ser "abierto" o "cerrado"
            type: Sequelize.STRING
        },
        total: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        createdAt:{
            type: Sequelize.DATE,
            field: 'fecha_y_hora_creacion'
        },
        fecha_y_hora_creacion:{
            type: Sequelize.DATE,
            defaultValue: DataTypes.NOW
        },
        fecha_y_hora_cierre:{
            type: Sequelize.DATE
        }
    });
    return CabeceraConsumo;
};
