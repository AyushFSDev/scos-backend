// =============================================================
// SERVICE: role.service.js
// Handles role creation and retrieval business logic.
// =============================================================

const pool = require("../../config/db");
const { AppError, ERRORS } = require("../../config/errors");
const { ROLE_QUERIES } = require("../../config/queries");


// -------------------------------------------------------------
// CREATE ROLE
// Inserts a new role into the database and returns the full record.
// -------------------------------------------------------------
exports.createRole = async (data) => {
  const { name, code, icon, description } = data;

  try {
    const result = await pool.query(ROLE_QUERIES.CREATE_ROLE, [
      name,
      code,
      icon,
      description,
    ]);

    return result.rows[0];
  } catch (err) {
    throw new AppError(ERRORS.ROLE_CREATE_FAILED);
  }
};


// -------------------------------------------------------------
// GET ALL ROLES
// Fetches and returns all role records.
// -------------------------------------------------------------
exports.getRoles = async () => {
  const result = await pool.query(ROLE_QUERIES.GET_ALL_ROLES);
  return result.rows;
};
