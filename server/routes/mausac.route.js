const express = require('express');
const router = express.Router();
const mausacController = require('../controllers/mausac.controller');

router.get('/', mausacController.getAlls);
router.get('/:IDmausac', mausacController.get);
router.post('/', mausacController.post);
router.patch('/:IDmausac', mausacController.patch);
router.delete('/:IDmausac', mausacController.delete);

module.exports = router;