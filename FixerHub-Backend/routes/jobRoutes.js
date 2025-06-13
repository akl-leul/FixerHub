const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { auth, requireRole } = require('../middleware/authMiddleware');

router.post('/', auth, requireRole('professional'), jobController.createJob);
router.get('/', auth, requireRole('professional'), jobController.getJobs);
router.put('/:job_id', auth, requireRole('professional'), jobController.updateJob);
router.delete('/:job_id', auth, requireRole('professional'), jobController.deleteJob);
router.get('/:job_id', auth, jobController.getJobDetails);
router.post('/:job_id/hire', auth, requireRole('client'), jobController.hireProfessional);

module.exports = router;