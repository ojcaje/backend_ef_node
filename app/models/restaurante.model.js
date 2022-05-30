module.exports = (sequelize, Sequelize) => {
    const Restaurante = sequelize.define("Restaurante", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        }  
    });
    return Restaurante;
};
