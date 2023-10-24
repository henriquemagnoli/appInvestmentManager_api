const sequelize = require('sequelize');
const connection = require('../connection/database');
const usuario = require('../model/usuarioModel');

const historico = connection.define('historico', {
    tipoativo:{
        type: sequelize.STRING,
        allowNull: false
    },
    codigoativo:{
        type: sequelize.STRING,
        allowNull: false
    },
    datacompra:{
        type: sequelize.DATE,
        allowNull: false
    },
    datavenda:{
        type: sequelize.DATE,
        allowNull: false
    },
    quantidade:{
        type: sequelize.INTEGER,
        allowNull: false
    },
    preco:{
        type: sequelize.DOUBLE,
        allowNull: false
    },
    outroscustos:{
        type: sequelize.DOUBLE,
        allowNull: true
    },
    tipo:{
        type: sequelize.ENUM,
        values: ['C','V'],
        allowNull: false
    }
})

usuario.hasMany(historico, {
    foreignKey: 'usuarioID'
});

historico.sync({force: false}).then(() => {
    console.log("Tabela de historico criada!");
})

module.exports = historico;