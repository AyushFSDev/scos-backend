const pool = require("../../config/db");

exports.createMapping = async (data) => {
  const { tenant_id, user_id, institute_id, role_id, is_primary } = data;

  // 🔒 Validation: check mapping exists
  const check = await pool.query(
    `SELECT * FROM user_institute_roles
     WHERE user_id=$1 AND institute_id=$2 AND role_id=$3`,
    [user_id, institute_id, role_id]
  );

  if (check.rows.length > 0) {
    throw new Error("Mapping already exists");
  }

  const result = await pool.query(
    `INSERT INTO user_institute_roles
    (tenant_id, user_id, institute_id, role_id, is_primary)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [tenant_id, user_id, institute_id, role_id, is_primary]
  );

  return result.rows[0];
};

exports.getMappings = async () => {
  const result = await pool.query(`
    SELECT 
      uir.*,
      u.full_name,
      i.name as institute_name,
      r.name as role_name
    FROM user_institute_roles uir
    JOIN users u ON u.id = uir.user_id
    JOIN institutes i ON i.id = uir.institute_id
    JOIN roles r ON r.id = uir.role_id
  `);

  return result.rows;
};