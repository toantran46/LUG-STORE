const express = require('express');
const router = express.Router();
const chucvuController = require('../controllers/chucvu.controller');

router.get('/', chucvuController.getAlls);
router.get('/:IDchucvu', chucvuController.get);
router.post('/', chucvuController.post);
router.patch('/:IDchucvu', chucvuController.patch);
router.delete('/:IDchucvu', chucvuController.delete);

module.exports = router;