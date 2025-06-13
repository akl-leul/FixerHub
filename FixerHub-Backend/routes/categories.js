const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM Categories');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;