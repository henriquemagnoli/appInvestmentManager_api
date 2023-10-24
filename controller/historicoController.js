const historicoModel = require('../model/historicoModel');

const listarHistorico = async (req, res) => {

    await historicoModel.findAll({raw: true, order:[['id','DESC']]}).then((historico) => {
        if(historico !== null)
            res.json(historico)
        else
            res.status(200).send('Não existe histórico.');
    }).catch(() => {
        res.status(500).send('Internal server error.')
    })
}

const criarHistorico = async (req, res) => {

    if(Object.keys(req.body).length === 0)
    {
        res.status(400).send('Corpo da requisição vazio');
        return;
    }

    await historicoModel.create({
        tipoativo: req.body.tipoativo,
        codigoativo: req.body.codigoativo,
        datacompra: req.body.datacompra,
        datavenda: req.body.datavend,
        quantidade: req.body.quantidade,
        preco: req.body.preco,
        outroscustos: req.body.outroscustos,
        tipo: req.body.tipo,
        usuarioID: req.body.usuarioID
    }).then((data) => {
        res.status(200).send("Histórico Criado");
    }).catch(() => {
        res.status(500).send('Internal server error');
    })
}

module.exports = {listarHistorico, criarHistorico};