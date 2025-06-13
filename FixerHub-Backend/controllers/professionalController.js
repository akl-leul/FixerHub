const { v4: uuidv4 } = require('uuid');
const pool = require('../config/db');

const uploadDocuments = async (req, res, next) => {
  try {
    const { national_id_document, work_clearance_document } = req.files;
    const user_id = req.user.user_id;

    await pool.query(
      'INSERT INTO ProfessionalDocuments (document_id, user_id, national_id_document_url, work_clearance_document_url, verification_status) VALUES ($1, $2, $3, $4, $5)',
      [uuidv4(), user_id, national_id_document[0].path, work_clearance_document[0].path, 'pending']
    );

    res.json({ message: 'Documents uploaded successfully' });
  } catch (err) {
    next(err);
  }
};

const getDocumentStatus = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT verification_status FROM ProfessionalDocuments WHERE user_id = $1',
      [req.user.user_id]
    );

    if (result.rowCount === 0) return res.status(404).json({ error: 'No documents found' });
    res.json({ status: result.rows[0].verification_status });
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadDocuments, getDocumentStatus };