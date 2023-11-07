const usuarioModel = require('../model/usuarioModel');
const { Op } = require("sequelize");

const validarLogin = async (req, res) => 
{
    usuarioModel.findOne({where:{email:req.body.email, 
                          [Op.and]: {senha: req.body.senha}}}).then((data) => {

        if(data != null)
            res.status(200).json({"message":"Login efetuado.",
                                  "statusCode": 200,
                                  "idUsuario": data.id,
                                  "type": "Received"})
        else
            res.status(200).json({"message":"Usuário ou senha inválidos.",
                                  "statusCode": 400,
                                  "idUsuario": null,
                                  "type": "Empty"})              
    }).catch((e) => {
        res.status(500).json({"message":"Internal Server Error",
                              "statusCode": 500,
                              "idUsuario": null,
                              "type": "Empty"})
    })
}

module.exports = {validarLogin}