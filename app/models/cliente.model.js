module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("Cliente", {
        nombre: {
            type: Sequelize.STRING
        },
        cedula: {
            type: Sequelize.INTEGER,
            unique: true
        },
        apellido: {
            type: Sequelize.STRING
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Cliente;
};