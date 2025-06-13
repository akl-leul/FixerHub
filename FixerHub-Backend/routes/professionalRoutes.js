const express = require('express');
const router = express.Router();
const professionalController = require('../controllers/professionalController');
const { auth, requireRole } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post(
  '/documents',
  auth,
  requireRole('professional'),
  upload.fields([
    { name: 'national_id_document', maxCount: 1 },
    { name: 'work_clearance_document', maxCount: 1 }
  ]),
  professionalController.uploadDocuments
);

router.get('/document-status', auth, requireRole('professional'), professionalController.getDocumentStatus);

module.exports = router;