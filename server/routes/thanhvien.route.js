const express = require('express');
const router = express.Router();
const thanhvienController = require('../controllers/thanhvien.controller');
const { isAuth } = require('../middleware/auth.middleware');

router.get('/', thanhvienController.getAlls);
// router.get('/:IDthanhvien', thanhvienController.get);
router.get('/get_me', isAuth, thanhvienController.getMe);
router.get('/get_new_token', isAuth, thanhvienController.getNewToken);
router.post('/save_thanhvien_social_media', thanhvienController.userInfoLoginSocial);
router.post('/', thanhvienController.post);
router.patch('/:IDthanhvien', isAuth, thanhvienController.patch);
router.delete('/:IDthanhvien', thanhvienController.delete);

module.exports = router;