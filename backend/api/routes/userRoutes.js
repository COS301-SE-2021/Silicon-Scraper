const express = require('express');
const router =  express.Router();
const userController = require('../controllers/userController.js');

router.post('/', userController.register_user);
router.post('/login', userController.login_user);
router.delete('/', userController.delete_user);
router.post('/watchlist', userController.add_to_watchlist);
router.delete('/watchlist', userController.remove_from_watchlist);

module.exports = router;