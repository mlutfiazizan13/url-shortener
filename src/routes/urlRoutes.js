
const express = require('express');

const authController = require('../controllers/authController');
const urlController = require('../controllers/urlController');
const authenticate = require('../middlewares/authMiddleware');

// const urlController = require('../controllers/urlController');
// const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

// User routes
router.post('/register', authController.register);
router.post('/login', authController.login);


// URL routes
router.get('/:shortCode', urlController.redirectToOriginalUrl);
router.post('/url/shorten', authenticate, urlController.createUrl);
router.get('/url/stats/:shortCode', authenticate, urlController.getUrlStats);
router.delete('/url/:shortCode', authenticate, urlController.deleteUrl);

module.exports = router;