const ativoModel = require('../model/ativoModel');
const historicoController = require('./historicoController');

const listarAtivos = async (req, res) => 
{
    await ativoModel.findAll({raw: true, order:[['id','DESC']]}).then((ativos) => {
        if(ativos !== null)
            res.json(ativos);
        else
            res.status(200).json({"message": "Não existem ativos.",
                                  "type": "Empty"});
    }).catch(() => {
        res.status(500).json({"message": "Internal Server Error.",
                              "type": "Empty"})

        return;
    })
}

const listarAtivosNome = async (req, res) => 
{
    await ativoModel.findOne({where: {codigoativo : req.params.codigoativo}}).then((ativos) => {
        if(ativos !== null)
            res.json(ativos)
        else
            res.status(200).json({"message": "Não existe ativo com esse nome.",
                                  "type": "Empty"});
    }).catch(() => {
        res.status(500).json({"message": "Internal Server Error.",
                              "type": "Empty"})

        return;
    })
}

const criarAtivo = async (req, res) => 
{ 
    if(Object.keys(req.body).length === 0)
    {
        res.status(400).json({"message": "Corpo da requisição não pode ser vazio.",
                              "type": "Empty"});
        return;
    }

    await ativoModel.create({
        tipoativo: req.body.tipoativo,
        codigoativo: req.body.codigoativo,
        quantidade: req.body.quantidade,
        preco: req.body.preco,
        outroscustos: req.body.outroscustos,
        usuarioID: req.body.usuarioID
    }).then((data) => {      
        historicoController.criarHistorico(req, res)

        res.status(200).json({"message": "Ativo Criado.",
                              "type": "Received"})
    }).catch(() => {
        res.status(500).json({"message": "Internal Server Error.",
                              "type": "Empty"})

        return;
    })    
}

const excluirAtivo = async (req, res) => 
{
    // Verifica se o id passado existe
    const verifyID = await ativoModel.count({where:{id:req.params.id}})

    if(verifyID)
    {
        ativoModel.destroy({where:{id: req.params.id}}).then(() => {
            res.status(200).json({"message":"Ativo Excluido.",
                                  "type": "Received"})
        }).catch(() => {
            res.status(500).json({"message":"Internal Server Error.",
                                  "type": "Empty"})

            return;
        })
    }
    else
    {
        res.status(200).json({"message":"Ativo não foi encontrado.",
                              "type": "Empty"})

        return;
    }
}

const alterarAtivo = async (req, res) => 
{
    // Verifica se o id passado existe
    const verifyID = await ativoModel.count({where:{id:req.params.id}});
    const getData = await ativoModel.findOne({where: {id : req.params.id}, attributes: ['quantidade','preco']});
    
    if(verifyID)
    {
        let quantidade;
        let quantidadeAntiga = req.body.quantidade;
        let precoAntigo = req.body.preco;

        // Casa o tipo da compra do ativo for 'V'(Venda), salvo a quantidade antiga e 
        // o preco antigo e por fim altero a quantidade e preco com oq retornou do banco
        if(req.body.tipo == 'V')
        {
            quantidade = getData.quantidade - req.body.quantidade;

            if(quantidade <= 0)
            {
                res.status(200).json({"message":"Ativo não pode ser vendido, pois possuí quantidade igual ou menor que zero.",
                                      "type": "Empty"});

                return;
            }
               
         
            preco = getData.preco - req.body.preco;
        }
        else if(req.body.tipo == 'C')
        {
            quantidade = getData.quantidade + req.body.quantidade;
            preco = getData.preco + req.body.preco;
        }   
        
        req.body.quantidade = quantidade;
        req.body.preco = preco;

        ativoModel.update(req.body, {where:{id: req.params.id}}).then(() => {

            req.body.quantidade = quantidadeAntiga;
            req.body.preco = precoAntigo;

            historicoController.criarHistorico(req, res);

            res.status(200).json({"message":"Ativo foi alterado.",
                                  "type": "Received"})
        }).catch(() => {
            res.status(500).json({"message":"Internal Server Error.",
                                  "type": "Empty"})

            return;
        })
    }
    else
    {
        res.status(200).json({"message":"Ativo não foi encontrado.",
                              "type": "Empty"})

        return;
    } 
}

module.exports = {listarAtivos, listarAtivosNome, criarAtivo, excluirAtivo, alterarAtivo}