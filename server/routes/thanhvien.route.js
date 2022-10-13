const express = require('express');
const router = express.Router();
const thanhvienController = require('../controllers/thanhvien.controller');
const { isAuth } = require('../middleware/auth.middleware');
const upload = require('../globals/upload');

router.get('/', thanhvienController.getAlls);
// router.get('/:IDthanhvien', thanhvienController.get);
router.get('/get_me', isAuth, thanhvienController.getMe);
router.get('/get_new_token', isAuth, thanhvienController.getNewToken);
router.post('/get_thanhvien_social_media', thanhvienController.userInfoLoginSocial);
router.post('/', thanhvienController.post);
router.patch('/:IDthanhvien', upload.single('TV_AVATAR'), thanhvienController.patch);
router.delete('/:IDthanhvien', thanhvienController.delete);
router.post('/login', thanhvienController.login);


module.exports = router;