module.exports = (sequelize, Sequelize) => {
    const Restaurant = sequelize.define("Restaurant", {
        nombre: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Restaurant;
};