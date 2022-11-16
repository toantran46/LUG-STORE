const express = require('express');
const router = express.Router();
const phieunhapController = require('../controllers/phieunhap.controller');
const { isAuth } = require('../middleware/auth.middleware')

router.get('/', phieunhapController.getAlls);
router.get('/:IDphieunhap', phieunhapController.get);
router.post('/', isAuth, phieunhapController.post);
router.patch('/:IDphieunhap', phieunhapController.patch);
router.delete('/:IDphieunhap', phieunhapController.delete);

module.exports = router;