const pool = require("../../config/db");

exports.createInstitute = async (data) => {
  const { tenant_id, name, code, type, logo } = data;

  const result = await pool.query(
    `INSERT INTO institutes (tenant_id, name, code, type, logo)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [tenant_id, name, code, type, logo]
  );

  return result.rows[0];
};

exports.getInstitutes = async () => {
  const result = await pool.query(`SELECT * FROM institutes`);
  return result.rows;
};