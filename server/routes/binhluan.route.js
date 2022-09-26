const express = require('express');
const router = express.Router();
const binhluanController = require('../controllers/binhluan.controller');

router.get('/', binhluanController.getAlls);
router.get('/:IDbinhluan', binhluanController.get);
router.post('/', binhluanController.post);
router.patch('/:IDbinhluan', binhluanController.patch);
router.delete('/:IDbinhluan', binhluanController.delete);

module.exports = router;