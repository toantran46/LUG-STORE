const express = require('express');
const router = express.Router();
const thuonghieuController = require('../controllers/thuonghieu.controller');

router.get('/', thuonghieuController.getAlls);
router.get('/:IDthuonghieu', thuonghieuController.get);
router.post('/', thuonghieuController.post);
router.patch('/:IDthuonghieu', thuonghieuController.patch);
router.delete('/:IDthuonghieu', thuonghieuController.delete);

module.exports = router;