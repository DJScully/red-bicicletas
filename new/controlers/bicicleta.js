var Bicicletas = require("../models/modelo_bici");

exports.Bicicletas_list = function(req,res){
    Bicicletas.allBicis().exec((err, bicis)=>{
        res.render("bicicletas/index", {bicis});
    })
    
}

exports.Bicicletas_create_get = function (req,res) {
    res.render('bicicletas/create');
}

exports.Bicicletas_create_post = function (req,res) {
    var bici = new Bicicletas({
        code: req.body.code,
        color: req.body.color,
        modelo: req.body.modelo
    });

    bici.Ubicacion = [req.body.lat, req.body.lng];
    Bicicletas.add(bici);
    res.redirect('/bicicletas');
}

exports.Bicicletas_delete_post = function (req,res) {
    Bicicletas.removeId(req.body.id);

    res.redirect('/bicicletas');
}

exports.Bicicletas_update_get = function (req,res) {
    var bici = Bicicletas.findById(req.params.id);

    res.render("bicicletas/update", {bici});
}

exports.Bicicletas_update_post = function (req,res) {
    var bici = Bicicletas.findById(req.params.id);
    bici.id = req.body.code;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    res.redirect('/bicicletas');
}