const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/db');
const { generateToken } = require('../utils/jwt');
const { sendVerificationEmail } = require('../utils/email');
const { validateSignup, validateLogin } = require('../utils/validators');

const signupClient = async (req, res, next) => {
  try {
    const { error } = validateSignup(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { username, email, phone_number, password } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    const verification_otp = Math.floor(100000 + Math.random() * 900000).toString();

    const result = await pool.query(
      'INSERT INTO Users (user_id, username, email, phone_number, password_hash, verification_otp, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [uuidv4(), username, email, phone_number, password_hash, verification_otp, 'client']
    );

    await sendVerificationEmail(email, verification_otp);
    res.status(201).json({ message: 'Client registered. Verify your email.' });
  } catch (err) {
    next(err);
  }
};

const signupProfessional = async (req, res, next) => {
  try {
    const { error } = validateSignup(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { username, email, phone_number, password } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    const verification_otp = Math.floor(100000 + Math.random() * 900000).toString();

    const result = await pool.query(
      'INSERT INTO Users (user_id, username, email, phone_number, password_hash, verification_otp, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [uuidv4(), username, email, phone_number, password_hash, verification_otp, 'professional']
    );

    await sendVerificationEmail(email, verification_otp);
    res.status(201).json({ message: 'Professional registered. Verify your email.' });
  } catch (err) {
    next(err);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { otp } = req.body;
    if (!otp) return res.status(400).json({ error: 'OTP is required' });

    const result = await pool.query(
      'UPDATE Users SET is_verified = true WHERE verification_otp = $1 AND is_verified = false RETURNING user_id, role',
      [otp]
    );

    if (result.rowCount === 0) return res.status(400).json({ error: 'Invalid OTP' });

    const user = result.rows[0];
    const token = generateToken({ user_id: user.user_id, role: user.role });
    res.json({ message: 'Email verified successfully', token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM Users WHERE email = $1 AND is_verified = true', [email]);

    if (result.rowCount === 0) return res.status(400).json({ error: 'Invalid credentials' });

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return res.status(400).json({ error: 'Invalid credentials' });

    const token = generateToken({ user_id: user.user_id, role: user.role });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { signupClient, signupProfessional, verifyEmail, login };