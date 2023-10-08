const usuarioModel = require('../model/usuarioModel');

const validarLogin = (req, res) => 
{
    usuarioModel.findOne({where:{email:req.body.email}}).then((data) => {
        res.json("Login Efetuado")
    })
}

module.exports = {validarLogin}