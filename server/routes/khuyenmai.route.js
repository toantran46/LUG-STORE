const express = require('express');
const router = express.Router();
const khuyenmaiController = require('../controllers/khuyenmai.controller');

router.get('/', khuyenmaiController.getAlls);
router.get('/:IDkhuyenmai', khuyenmaiController.get);
router.post('/', khuyenmaiController.post);
router.patch('/:IDkhuyenmai', khuyenmaiController.patch);
router.delete('/:IDkhuyenmai', khuyenmaiController.delete);

module.exports = router;