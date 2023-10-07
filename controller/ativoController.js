const ativoModel = require('../model/ativoModel');

const listarAtivos = (req, res) => {

    ativoModel.findAll({raw: true, order:[['id','DESC']]}).then((ativos) => {
        res.json(ativos)
    })
}

const criarAtivo = (req, res) => {
 
    ativoModel.create({
        tipoativo: req.body.tipoativo,
        codigoativo: req.body.codigoativo,
        datacompra: req.body.datacompra,
        quantidade: req.body.quantidade,
        preco: req.body.preco,
        outroscustos: req.body.outroscustos
    }).then((data) => {
        res.json("Ativo Criado");
    })
}

const excluirAtivo = (req, res) => {

    ativoModel.destroy({where:{id: req.params.id}}).then(() => {
        res.json("Ativo Excluido")
        
    })
}

const alterarAtivo = (req, res) => {
    
    ativoModel.update(req.body, {where:{id: req.params.id}}).then(() => {
        res.json("Ativo Alterado")
    })
}

module.exports = {listarAtivos, criarAtivo, excluirAtivo, alterarAtivo}