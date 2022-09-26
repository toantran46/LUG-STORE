const express = require('express');
const router = express.Router();
const phieunhapController = require('../controllers/phieunhap.controller');

router.get('/', phieunhapController.getAlls);
router.get('/:IDphieunhap', phieunhapController.get);
router.post('/', phieunhapController.post);
router.patch('/:IDphieunhap', phieunhapController.patch);
router.delete('/:IDphieunhap', phieunhapController.delete);

module.exports = router;