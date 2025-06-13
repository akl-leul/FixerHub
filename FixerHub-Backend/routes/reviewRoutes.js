const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { auth, requireRole } = require('../middleware/authMiddleware');

router.post('/', auth, requireRole('client'), reviewController.createReview);
router.get('/:professional_id', auth, reviewController.getReviews);

module.exports = router;