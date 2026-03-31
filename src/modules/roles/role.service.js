const pool = require("../../config/db");

exports.createRole = async (data) => {
  const { name, code, icon } = data;

  const result = await pool.query(
    `INSERT INTO roles (name, code, icon)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, code, icon]
  );

  return result.rows[0];
};

exports.getRoles = async () => {
  const result = await pool.query(`SELECT * FROM roles`);
  return result.rows;
};