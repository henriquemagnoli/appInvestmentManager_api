const sequelize = require('sequelize');
const connection = require('../connection/database');

const usuario = connection.define('usuario', {
    nomecompleto:{
        type: sequelize.STRING,
        allowNull: false
    },
    telefone:{
        type: sequelize.STRING,
        allowNull: false
    },
    email:{
        type: sequelize.STRING,
        unique: true,
        allowNull: false
    },
    cpf:{
        type: sequelize.STRING,
        unique: true,
        allowNull: false
    },
    senha:{
        type: sequelize.STRING,
        allowNull: false
    },
    datanascimento:{
        type: sequelize.DATE,
        allowNull: false
    }
})

usuario.sync({force: false}).then(() => {
    console.log("Tabela de usuario criada!");
})

module.exports = usuario;