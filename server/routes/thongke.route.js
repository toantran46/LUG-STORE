const express = require('express');
const router = express.Router();
const thongkeController = require('../controllers/thongke.controller');

router.get('/', thongkeController.thongkes);
router.get('/thongkedashboards', thongkeController.thongkedashboards);

module.exports = router;