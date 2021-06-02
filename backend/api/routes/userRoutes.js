const express = require('express');
const router =  express.Router();
const userController = require('../controllers/userController.js');

router.post('/', userController.register_user);
router.post('/login', userController.login_user);
router.delete('/', userController.delete_user);
router.post('/addToWatchlist', userController.addToWatchlist);

module.exports = router;