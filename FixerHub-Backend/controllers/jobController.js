const { v4: uuidv4 } = require('uuid');
const pool = require('../config/db');
const { validateJob } = require('../utils/validators');

const createJob = async (req, res, next) => {
  try {
    const { error } = validateJob(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { category_id, sub_categories, location } = req.body;
    const user_id = req.user.user_id;

    const categoryPrice = sub_categories.reduce((sum, sc) => sum + sc.price, 0);
    const job_id = uuidv4();

    await pool.query(
      'INSERT INTO ProfessionalJobs (job_id, user_id, category_id, category_price, location) VALUES ($1, $2, $3, $4, ST_GeomFromText($5))',
      [job_id, user_id, category_id, categoryPrice, `POINT(${location.latitude} ${location.longitude})`]
    );

    for (const sc of sub_categories) {
      await pool.query(
        'INSERT INTO JobSubCategoryPricing (id, job_id, sub_category_id, price) VALUES ($1, $2, $3, $4)',
        [uuidv4(), job_id, sc.sub_category_id, sc.price]
      );
    }

    res.status(201).json({ message: 'Job created successfully' });
  } catch (err) {
    next(err);
  }
};

const getJobs = async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT pj.*, c.category_name 
       FROM ProfessionalJobs pj 
       JOIN Categories c ON pj.category_id = c.category_id 
       WHERE pj.user_id = $1`,
      [req.user.user_id]
    );

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const { job_id } = req.params;
    const { category_id, sub_categories, location } = req.body;
    const user_id = req.user.user_id;

    const categoryPrice = sub_categories.reduce((sum, sc) => sum + sc.price, 0);

    await pool.query(
      'UPDATE ProfessionalJobs SET category_id = $1, category_price = $2, location = ST_GeomFromText($3) WHERE job_id = $4 AND user_id = $5',
      [category_id, categoryPrice, `POINT(${location.latitude} ${location.longitude})`, job_id, user_id]
    );

    await pool.query('DELETE FROM JobSubCategoryPricing WHERE job_id = $1', [job_id]);

    for (const sc of sub_categories) {
      await pool.query(
        'INSERT INTO JobSubCategoryPricing (id, job_id, sub_category_id, price) VALUES ($1, $2, $3, $4)',
        [uuidv4(), job_id, sc.sub_category_id, sc.price]
      );
    }

    res.json({ message: 'Job updated successfully' });
  } catch (err) {
    next(err);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const { job_id } = req.params;
    await pool.query('DELETE FROM ProfessionalJobs WHERE job_id = $1 AND user_id = $2', [job_id, req.user.user_id]);
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    next(err);
  }
};

const getJobDetails = async (req, res, next) => {
  try {
    const { job_id } = req.params;
    const jobResult = await pool.query(
      `SELECT pj.*, u.username, u.phone_number, c.category_name 
       FROM ProfessionalJobs pj 
       JOIN Users u ON pj.user_id = u.user_id 
       JOIN Categories c ON pj.category_id = c.category_id 
       WHERE pj.job_id = $1`,
      [job_id]
    );
    const subCategoriesResult = await pool.query(
      `SELECT jscp.*, sc.sub_category_name 
       FROM JobSubCategoryPricing jscp 
       JOIN SubCategories sc ON jscp.sub_category_id = sc.sub_category_id 
       WHERE jscp.job_id = $1`,
      [job_id]
    );
    if (jobResult.rowCount === 0) return res.status(404).json({ error: 'Job not found' });
    res.json({ ...jobResult.rows[0], sub_categories: subCategoriesResult.rows });
  } catch (err) {
    next(err);
  }
};


const hireProfessional = async (req, res, next) => {
  try {
    const { job_id } = req.params;
    // Add logic to record hire (e.g., save to a Hires table)
    res.json({ message: 'Professional hired successfully' });
  } catch (err) {
    next(err);
  }
};
module.exports = { createJob, getJobs, updateJob, deleteJob, getJobDetails, hireProfessional };