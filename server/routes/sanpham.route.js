const express = require('express');
const router = express.Router();
const upload = require('../globals/upload');

const sanphamController = require('../controllers/sanpham.controller');

router.get('/', sanphamController.getAlls);
router.get('/:IDsanpham', sanphamController.get);
router.post('/', upload.array('HASP_DUONGDAN'), sanphamController.post);
router.patch('/:IDsanpham', upload.array('HASP_DUONGDAN'), sanphamController.patch);
router.delete('/:IDsanpham', sanphamController.delete);

module.exports = router;