module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define("Categoria", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING,
            unique: true
        }
    });
    return Categoria;
};
