module.exports = {

    HOST: "localhost",

    USER: "postgres",

    PASSWORD: "Diego123456",

    PORT: 5432,

    DB: "dbpwb",

    dialect: "postgres",

    pool: {

        max: 5,

        min: 0,

        acquire: 30000,

        idle: 10000

    }

};