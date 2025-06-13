const pool = require('../config/db');

const searchProfessionals = async (req, res, next) => {
  try {
    const { category_id, sub_category_id, latitude, longitude, max_distance = 50 } = req.query;

    let query = `
      SELECT pj.*, u.username, c.category_name, ST_Distance(pj.location, ST_GeomFromText($1)) AS distance
      FROM ProfessionalJobs pj
      JOIN Users u ON pj.user_id = u.user_id
      JOIN Categories c ON pj.category_id = c.category_id
      WHERE ST_DWithin(pj.location, ST_GeomFromText($1), $2)
    `;
    const params = [`POINT(${latitude} ${longitude})`, max_distance * 1000];

    if (category_id) {
      query += ` AND pj.category_id = $${params.length + 1}`;
      params.push(category_id);
    }

    if (sub_category_id) {
      query += ` AND EXISTS (
        SELECT 1 FROM JobSubCategoryPricing jscp 
        WHERE jscp.job_id = pj.job_id AND jscp.sub_category_id = $${params.length + 1}
      )`;
      params.push(sub_category_id);
    }

    query += ' ORDER BY pj.category_price ASC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

module.exports = { searchProfessionals };