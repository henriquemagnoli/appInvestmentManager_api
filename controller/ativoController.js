const ativoModel = require('../model/ativoModel');
const historicoController = require('./historicoController');

const listarAtivos = async (req, res) => {

    await ativoModel.findAll({raw: true, order:[['id','DESC']]}).then((ativos) => {
        if(ativos !== null)
            res.json(ativos);
        else
            res.status(200).send('Não existem ativos.');
    }).catch(() => {
        res.status(500).send('Internal server error');
    })
}

const criarAtivo = async (req, res) => {
 
    if(Object.keys(req.body).length === 0)
    {
        res.status(400).send('Corpo da requisição vazio');
        return;
    }

    await ativoModel.create({
        tipoativo: req.body.tipoativo,
        codigoativo: req.body.codigoativo,
        datacompra: req.body.datacompra,
        quantidade: req.body.quantidade,
        preco: req.body.preco,
        outroscustos: req.body.outroscustos,
        tipo: req.body.tipo,
        usuarioID: req.body.usuarioID
    }).then((data) => {
        
        historicoController.criarHistorico(req, res)

        res.status(200).send("Ativo Criado");
    }).catch(() => {
        res.status(500).send('Internal server error');
    })

    
}

const excluirAtivo = async (req, res) => {

    // Verifica se o id passado existe
    const verifyID = await ativoModel.count({where:{id:req.params.id}})

    if(verifyID)
    {
        ativoModel.destroy({where:{id: req.params.id}}).then(() => {
            res.json("Ativo Excluido")
        }).catch(() => {
            res.status(500).send("internal server error")
        })
    }
    else
    {
        res.status(200).send("Ativo não encontrado");
    }
}

const alterarAtivo = async (req, res) => {

    // Verifica se o id passado existe
    const verifyID = await ativoModel.count({where:{id:req.params.id}})
    
    if(verifyID)
    {
        ativoModel.update(req.body, {where:{id: req.params.id}}).then(() => {
            res.status(200).send('Ativo foi alterado.')
        })
    }
    else
    {
        res.status(200).send("Ativo não encontrado");
    } 
}

module.exports = {listarAtivos, criarAtivo, excluirAtivo, alterarAtivo}