var express = require("express");
var router = express.Router();
var usuarioController = require("../../controlers/API/usuariocontrollerAPI");

router.get('/',usuarioController.usuarios_list);
router.post('/create', usuarioController.usuario_create);
router.post('/reservar', usuarioController.usuario_reservar);

module.exports = router;
