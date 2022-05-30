module.exports = (sequelize, Sequelize) => {
    const Mesa = sequelize.define("Mesa", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        posicionx: {
            type: Sequelize.INTEGER
        },
        posiciony: {
            type: Sequelize.INTEGER
        },
        planta: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        capacidad: {
            type: Sequelize.INTEGER
        }
    });
    return Mesa;
};
