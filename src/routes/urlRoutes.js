
const express = require('express');

const authController = require('../controllers/authController');

// const urlController = require('../controllers/urlController');
// const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

// User routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// URL routes
// router.post('/urls', authMiddleware.authenticate, urlController.createShortUrl);
// router.get('/urls/:shortCode', urlController.getOriginalUrl);
// router.get('/users/:userId/urls', authMiddleware.authenticate, urlController.getUserUrls);

module.exports = router;