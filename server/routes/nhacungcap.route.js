const express = require('express');
const router = express.Router();
const nhacungcapController = require('../controllers/nhacungcap.controller');

router.get('/', nhacungcapController.getAlls);
router.get('/:IDnhacungcap', nhacungcapController.get);
router.post('/', nhacungcapController.post);
router.patch('/:IDnhacungcap', nhacungcapController.patch);
router.delete('/:IDnhacungcap', nhacungcapController.delete);

module.exports = router;