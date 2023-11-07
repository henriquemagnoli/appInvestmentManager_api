const historicoModel = require('../model/historicoModel');

const listarHistorico = async (req, res) => {

    await historicoModel.findAll({raw: true, order:[['id','DESC']]}).then((historico) => {
        if(historico !== null)
            res.json(historico)
        else
            res.status(200).json({"message":"Não existe histórico.",
                                  "type": "Empty"});
    }).catch(() => {
        res.status(500).json({"message":"Internal server error.",
                              "type": "Empty"});

        return;
    })
}

const criarHistorico = async (req, res) => {

    if(Object.keys(req.body).length === 0)
    {
        res.status(400).json({"message":"Corpo da requisição vazio.",
                              "type": "Empty"});
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
    }).then()
}

module.exports = {listarHistorico, criarHistorico};