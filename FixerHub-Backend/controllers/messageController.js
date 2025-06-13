const { v4: uuidv4 } = require('uuid');
const pool = require('../config/db');

const sendMessage = async (req, res, next) => {
  try {
    const { receiver_id, message_text } = req.body;
    const sender_id = req.user.user_id;

    await pool.query(
      'INSERT INTO Messages (message_id, sender_id, receiver_id, message_text, timestamp) VALUES ($1, $2, $3, $4, NOW())',
      [uuidv4(), sender_id, receiver_id, message_text]
    );

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    next(err);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { receiver_id } = req.query;
    const sender_id = req.user.user_id;

    const result = await pool.query(
      `SELECT * FROM Messages 
       WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) 
       ORDER BY timestamp ASC`,
      [sender_id, receiver_id]
    );

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

module.exports = { sendMessage, getMessages };