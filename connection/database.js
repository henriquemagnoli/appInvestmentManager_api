const Sequelize = require('sequelize');

const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
})

module.exports = connection;