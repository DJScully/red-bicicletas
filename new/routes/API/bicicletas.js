var express = require('express');
var router = express.Router();
var bicicleta_controller = require("../../controlers/API/bicicletaController");

router.get('/', bicicleta_controller.Bicicletas_list);
router.post('/create',bicicleta_controller.Bicicletas_create_post);
router.post('/delete',bicicleta_controller.Bicicletas_delete_post);

module.exports = router;