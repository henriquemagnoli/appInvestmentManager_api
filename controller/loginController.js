const usuarioModel = require('../model/usuarioModel');

const validarLogin = async (req, res) => 
{
    usuarioModel.findOne({where:{email:req.params.email}}).then((data) => {
        res.json("Login Efetuado")
    })
}

module.exports = {validarLogin}