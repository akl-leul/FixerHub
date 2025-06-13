const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { auth, requireRole } = require('../middleware/authMiddleware');

router.get('/', auth, requireRole('client'), searchController.searchProfessionals);

module.exports = router;