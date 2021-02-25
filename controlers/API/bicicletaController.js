 var Bicicletas = require("../../models/modelo_bici");

 exports.Bicicletas_list = function (req,res) {
     res.status(200).json({
         Bicicletas: Bicicletas.allBicis
     });
 }

 exports.Bicicletas_create_post = function (req,res) {
    var bici = new Bicicletas(req.body.id, req.body.color, req.body.modelo);
    Bicicletas.add(bici);
    res.status(200).json({
        Bicicletas: bici
    })
}

exports.Bicicletas_delete_post = function (req,res) {

    Bicicletas.removeId(req.body.id);
    res.status(204).send();
}

