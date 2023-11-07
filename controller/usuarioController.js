const usuarioModel = require('../model/usuarioModel');

const listarUsuario = async (req, res) => {

    await usuarioModel.findAll({raw: true, order:[['id','DESC']]}).then((usuarios) => {
        if(usuarios !== null)
            res.json(usuarios)
        else
            res.status(200).json({"message":"Não existem usuarios."});
    }).catch(() => {
        res.status(500).json({"message":"Internal server error.",
                              "type": "Empty"});
    })
}

const criarUsuario = async (req, res) => {

    // Se meu req.body for vazio, exibo status 400 pois não possui nenhum dado no body
    if(Object.keys(req.body).length === 0)
    {
        res.status(400).json({"message":"Corpo da requisição vazio.",
                              "type": "Empty"});
        return;
    }
 
    await usuarioModel.create({
        nomecompleto: req.body.nomecompleto,
        telefone: req.body.telefone,
        email: req.body.email,
        cpf: req.body.cpf,
        senha: req.body.senha,
        datanascimento: req.body.datanascimento
    }).then((data) => {
        res.status(200).json({"message":"Usuário criado.",
                              "type": "Received"});
    }).catch(() => {
        res.status(500).json({"message":"Internal server error.",
                              "type": "Empty"});
    })
}

const excluirUsuario = async (req, res) => {

    // Verifica se o id passado existe
    const verifyID = await usuarioModel.count({where:{id:req.params.id}})

    if(verifyID)
    {
        await usuarioModel.destroy({where:{id: req.params.id}}).then(() => {
            res.status(200).json({"message":"Usuário excluido.",
                                  "type": "Received"}); 
        }).catch(() => {
            res.status(500).json({"message":"Internal server error.",
                                  "type": "Empty"});
        })
    }
    else
    {
        res.status(200).json({"message":"Usuário não encontrado.",
                              "type": "Empty"});
    }
}

const alterarUsuario = async (req, res) => {

    // Verifica se o id passado existe
    const verifyID = await usuarioModel.count({where:{id:req.params.id}})

    // Se meu req.body for vazio, exibo status 400 pois não possui nenhum dado no body
    if(Object.keys(req.body).length === 0)
    {
        res.status(400).json({"message": "Corpo da requisição não pode ser vazio.",
                              "type": "Empty"});
        return;
    }

    if(verifyID)
    {
        await usuarioModel.update(req.body, {where:{id: req.params.id}}).then(() => {
            res.status(200).json({"message":"Usuário foi alterado.",
                                  "type": "Received"});

        }).catch(() =>{
            res.status(500).json({"message":"Internal server error.",
                                  "type": "Empty"});
        })
    }
    else
    {
        res.status(200).json({"message":"Usuário não encontrado.",
                              "type": "Empty"});
    }
}

module.exports = {listarUsuario, criarUsuario, excluirUsuario, alterarUsuario}