const express = require('express');
const router = express.Router();
const nhanvienController = require('../controllers/nhanvien.controller');
const { isAuth } = require('../middleware/auth.middleware');

router.get('/', nhanvienController.getAlls);
// router.get('/:IDnhanvien', nhanvienController.get);
router.get('/get_new_token', isAuth, nhanvienController.get_new_token);
router.post('/', nhanvienController.post);
router.patch('/:IDnhanvien', nhanvienController.patch);
router.delete('/:IDnhanvien', nhanvienController.delete);

module.exports = router;