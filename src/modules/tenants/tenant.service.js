const pool = require("../../config/db");

exports.createTenant = async (data) => {
  const { name, code } = data;

  const result = await pool.query(
    `INSERT INTO tenants (name, code)
     VALUES ($1, $2)
     RETURNING *`,
    [name, code]
  );

  return result.rows[0];
};

exports.getTenants = async () => {
  const result = await pool.query(`SELECT * FROM tenants`);
  return result.rows;
};