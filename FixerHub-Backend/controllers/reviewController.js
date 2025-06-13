const { v4: uuidv4 } = require('uuid');
const pool = require('../config/db');

const createReview = async (req, res, next) => {
  try {
    const { professional_id, rating, review_text } = req.body;
    const client_id = req.user.user_id;

    await pool.query(
      'INSERT INTO Reviews (review_id, client_id, professional_id, rating, review_text, timestamp) VALUES ($1, $2, $3, $4, $5, NOW())',
      [uuidv4(), client_id, professional_id, rating, review_text]
    );

    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (err) {
    next(err);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const { professional_id } = req.params;
    const result = await pool.query(
      `SELECT r.*, u.username 
       FROM Reviews r 
       JOIN Users u ON r.client_id = u.user_id 
       WHERE r.professional_id = $1`,
      [professional_id]
    );

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

module.exports = { createReview, getReviews };