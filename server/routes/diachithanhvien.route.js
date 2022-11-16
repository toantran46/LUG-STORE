const express = require('express');
const router = express.Router();
const diachithanhvienController = require('../controllers/diachithanhvien.controller');

router.get('/', diachithanhvienController.getAlls);
router.get('/:TV_ID', diachithanhvienController.get);
router.post('/', diachithanhvienController.post);
router.patch('/:IDdiachithanhvien', diachithanhvienController.patch);
router.delete('/:IDdiachithanhvien', diachithanhvienController.delete);

module.exports = router;