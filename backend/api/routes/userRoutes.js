const express = require('express');
const router =  express.Router();
const userController = require('../controllers/userController.js');

router.post('/addToWatchlist', userController.addToWatchlist);

module.exports = router;