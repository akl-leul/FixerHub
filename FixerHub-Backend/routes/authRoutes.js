const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth } = require('../middleware/authMiddleware');

router.post('/register/client', authController.signupClient);
router.post('/register/professional', authController.signupProfessional);
router.post('/verify-email', authController.verifyEmail);
router.post('/login', authController.login);

module.exports = router;