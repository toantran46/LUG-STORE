const express = require('express');
const router = express.Router();
const diachithanhvienController = require('../controllers/diachithanhvien.controller');

router.get('/', diachithanhvienController.getAlls);
router.get('/:IDdiachithanhvien', diachithanhvienController.get);
router.post('/', diachithanhvienController.post);
router.patch('/:IDdiachithanhvien', diachithanhvienController.patch);
router.delete('/:IDdiachithanhvien', diachithanhvienController.delete);

module.exports = router;