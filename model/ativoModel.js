const sequelize = require('sequelize');
const connection = require('../connection/database');

const ativo = connection.define('ativo', {
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
        allowNull: false
    }
})

ativo.sync({force: false}).then(() => {
    console.log("Tabela de ativo criada!");
})

module.exports = ativo