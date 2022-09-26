const express = require('express');
const router = express.Router();
const yeuthichController = require('../controllers/yeuthich.controller');

router.get('/', yeuthichController.getAlls);
router.get('/:IDyeuthich', yeuthichController.get);
router.post('/', yeuthichController.post);
router.patch('/:IDyeuthich', yeuthichController.patch);
router.delete('/:IDyeuthich', yeuthichController.delete);

module.exports = router;