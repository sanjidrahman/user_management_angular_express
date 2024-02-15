const dbConfig = require('../config/configDB')
const { Sequelize, DataTypes } = require("sequelize");
const UsersModel = require('./user');

const sequelize = new Sequelize(
    dbConfig.DATABASE,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.DIALECT,
    }
);

const db = {
    Sequelize,
    models: {
        User: UsersModel(sequelize, { DataTypes })
    }
}

module.exports = db