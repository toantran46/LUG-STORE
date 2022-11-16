const express = require('express');
const router = express.Router();
const yeuthichController = require('../controllers/yeuthich.controller');
const { isAuth } = require('../middleware/auth.middleware')

router.get('/', isAuth, yeuthichController.getAlls);
router.get('/:IDyeuthich', yeuthichController.get);
router.post('/', isAuth, yeuthichController.post);
router.patch('/:IDyeuthich', yeuthichController.patch);
router.delete('/:IDyeuthich', isAuth, yeuthichController.delete);

module.exports = router;