module.exports = (sequelize, Sequelize) => {
    const Mesa = sequelize.define("Mesa", {
        nombre: {
            type: Sequelize.STRING
        },
        id_restaurante: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Restaurants',
                key: 'id'
            }
        },
        posicion: {
            type: Sequelize.ARRAY(Sequelize.DECIMAL)
        },
        numero_planta: {
            type: Sequelize.INTEGER,
            defaultValue: 1

        },
        capacidad: {
            type: Sequelize.INTEGER,
            defaultValue: 1

        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Mesa;
};