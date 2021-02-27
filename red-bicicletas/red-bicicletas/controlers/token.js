var Usuario = require('../models/modelo_bici');
var Token = require("../models/Tokens");


module.exports =  {
    confirmationGet: function(req,res,next){
        Token.findOne({Token: req.params.token}, function (err, token) {
            if (!token) {
                return res.status(400).send({ type:  'note-verified',msg: "No encontramos un usuario con este Token. Quiza haya sido expirado"});
            } 
            if (Usuario.findById(Token._userId, function (err,usuario) {
                if (!usuario) {
                    return res.status(400).send({msg: "No encontramos un usuario con este Token. Quiza haya sido expirado"});
                }

                if (usuario.verificado) {
                    return res.redirect('/usuarios');
                }

                usuario.verificado = true;
                usuario.save(function (err) {
                    if (err) {
                        return res.status(500).send({msg: err.mesage});
                    }
                    res.redirect('/');
                })
            })) {
            } 
        })
    }
}