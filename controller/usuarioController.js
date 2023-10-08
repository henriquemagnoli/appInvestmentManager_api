const usuarioModel = require('../model/usuarioModel');

const listarUsuario = (req, res) => {

    usuarioModel.findAll({raw: true, order:[['id','DESC']]}).then((usuarios) => {
        if(usuarios === null)
            res.json("Não existe usuarios")
        else
            res.json(usuarios)
    })
}

const criarUsuario = (req, res) => {
 
    usuarioModel.create({
        nomecompleto: req.body.nomecompleto,
        telefone: req.body.telefone,
        email: req.body.email,
        cpf: req.body.cpf,
        senha: req.body.senha,
        datanascimento: req.body.datanascimento
    }).then((data) => {
        res.json("Usuario Criado");
    })
}

const excluirUsuario = (req, res) => {

    usuarioModel.destroy({where:{id: req.params.id}}).then(() => {
        res.json("Usuario Excluido")
        
    })
}

const alterarUsuario = (req, res) => {
    
    usuarioModel.update(req.body, {where:{id: req.params.id}}).then(() => {
        res.json("Usuario Alterado")
    })
}

module.exports = {listarUsuario, criarUsuario, excluirUsuario, alterarUsuario}