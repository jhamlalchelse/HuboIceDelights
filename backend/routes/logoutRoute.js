const express = require('express');
const logoutController = require('../controllers/logoutcontroller');
const router = express.Router();

router.get('/', logoutController);
module.exports = router;
