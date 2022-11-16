const express = require('express');
const router = express.Router();
const donhangController = require('../controllers/donhang.controller');
const { isAuth } = require('../middleware/auth.middleware')

router.get('/', donhangController.getAlls);
// router.get('/:IDthanhvien', donhangController.get);
router.post('/', isAuth, donhangController.post);
router.get('/paymentMomo', donhangController.payment);
router.patch('/:IDdonhang', donhangController.patch);
router.delete('/:IDdonhang', donhangController.delete);

module.exports = router;