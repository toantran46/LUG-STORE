const express = require('express');
const router = express.Router();
const loaisanphamController = require('../controllers/loaisanpham.controller');

router.get('/', loaisanphamController.getAlls);
router.get('/:IDloaisanpham', loaisanphamController.get);
router.post('/', loaisanphamController.post);
router.patch('/:IDloaisanpham', loaisanphamController.patch);
router.delete('/:IDloaisanpham', loaisanphamController.delete);

module.exports = router;