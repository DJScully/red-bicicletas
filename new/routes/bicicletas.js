var express = require('express');
var router = express.Router();
var bicicleta_controller = require("../controlers/bicicleta");

router.get('/',bicicleta_controller.Bicicletas_list);
router.get('/create',bicicleta_controller.Bicicletas_create_get);
router.post('/create',bicicleta_controller.Bicicletas_create_post);
router.post('/:id/delete',bicicleta_controller.Bicicletas_delete_post);
router.get('/:id/update',bicicleta_controller.Bicicletas_update_get);
router.post('/:id/update',bicicleta_controller.Bicicletas_update_post);

module.exports = router;