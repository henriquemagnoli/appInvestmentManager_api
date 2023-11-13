const historicoModel = require('../model/historicoModel');
const usuarioModel = require('../model/usuarioModel');
const { Op } = require('sequelize');

const listarHistorico = async (req, res) => {

    // Verifica se o ID do usuario existe
    const verifyID = await usuarioModel.count({where:{id:req.params.idUsuario}})
    
    if(verifyID)
    {
        await historicoModel.findAll({where:{usuarioID:req.params.idUsuario}},{raw: true, order:[['id','DESC']]}).then((historico) => {
            if(historico !== null)
                res.status(200).json({"data": historico,
                                      "type": "received"})
            else
                res.status(200).json({"message":"Não existe histórico.",
                                      "type": "Empty"});
        }).catch(() => {
            res.status(500).json({"message":"Internal server error.",
                                  "type": "Empty"});
    
            return;
        })
    }
    else
    {
        res.status(200).json({"message":"Usuário não possui movimentação.",
                              "type": "Empty"})

        return;
    }
}

const listarHistoricoNome = async (req, res) => 
{
    // Verifica se existe ID do usuario
    const verifyID = await usuarioModel.count({where:{id:req.params.idUsuario}});

    if(verifyID)
    {
        await historicoModel.findAll({where: {codigoativo : req.params.codigoativo,
                                      [Op.and]: {usuarioID: req.params.idUsuario}}}).then((historico) => {
            if(historico !== null)
                res.status(200).json({"data": historico,
                                      "type": "Received"})
            else
                res.status(200).json({"message": "Não existe ativo com esse nome.",
                                      "type": "Empty"});                         
        }).catch((e) => {
            res.status(500).json({"message": "Internal Server Error." + e,
                                  "type": "Empty"})
    
            return;
        })
    }
    else
    {
        res.status(200).json({"message":"Usuário não possui movimentação.",
                              "type": "Empty"})

        return;
    }
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

module.exports = {listarHistorico, criarHistorico, listarHistoricoNome};