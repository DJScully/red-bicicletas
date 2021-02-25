const express = require('express');
const router = express.Router();
const passport = require('../../config/passport');
const authControllerApi = require('../../controlers/API/authControllerAPI');

router.post('/authenticate', authControllerApi.authenticate);
router.post('/forgotPassword', authControllerApi.forgotPassword);

module.exports = router;