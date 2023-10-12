const usuarioModel = require('../model/usuarioModel');

const listarUsuario = async (req, res) => {

    await usuarioModel.findAll({raw: true, order:[['id','DESC']]}).then((usuarios) => {
        if(usuarios !== null)
            res.json(usuarios)
        else
            res.status(200).send('Não existem usuarios');
    }).catch(() => {
        res.status(500).send('Internal server error');
    })
}

const criarUsuario = async (req, res) => {

    // Se meu req.body for vazio, exibo status 400 pois não possui nenhum dado no body
    if(Object.keys(req.body).length === 0)
    {
        res.status(400).send('Corpo da requisição vazio');
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
        res.status(200).send("Usuario Criado");
    }).catch(() => {
        res.status(500).send('Internal server error');
    })
}

const excluirUsuario = async (req, res) => {

    // Verifica se o id passado existe
    const verifyID = await usuarioModel.count({where:{id:req.params.id}})

    if(verifyID)
    {
        await usuarioModel.destroy({where:{id: req.params.id}}).then(() => {
            res.json("Usuario Excluido")     
        }).catch(() => {
            res.status(500).send("Internal server error");
        })
    }
    else
    {
        res.status(200).send("Usuário não encontrado");
    }
}

const alterarUsuario = async (req, res) => {

    // Verifica se o id passado existe
    const verifyID = await usuarioModel.count({where:{id:req.params.id}})

    // Se meu req.body for vazio, exibo status 400 pois não possui nenhum dado no body
    if(Object.keys(req.body).length === 0)
    {
        res.status(400).send('Corpo da requisição vazio');
        return;
    }

    if(verifyID)
    {
        await usuarioModel.update(req.body, {where:{id: req.params.id}}).then(() => {
            res.status(200).send('Usuario foi Atualizado')

        }).catch(() =>{
            res.status(500).send('Internal server error');
        })
    }
    else
    {
        res.status(200).send('Usuário não encontrado')
    }
}

module.exports = {listarUsuario, criarUsuario, excluirUsuario, alterarUsuario}