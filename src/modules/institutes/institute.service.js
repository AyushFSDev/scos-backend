// =============================================================
// SERVICE: institute.service.js
// Handles institute creation and retrieval business logic.
// =============================================================

const pool = require("../../config/db");
const { AppError, ERRORS } = require("../../config/errors");
const { INSTITUTE_QUERIES } = require("../../config/queries");


// -------------------------------------------------------------
// CREATE INSTITUTE
// Inserts a new institute under a given tenant and returns the full record.
// -------------------------------------------------------------
exports.createInstitute = async (data) => {
  const { tenant_id, name, code, type, logo } = data;

  try {
    const result = await pool.query(INSTITUTE_QUERIES.CREATE_INSTITUTE, [
      tenant_id,
      name,
      code,
      type,
      logo,
      data.city   ?? null,
      data.state  ?? null,
    ]);

    return result.rows[0];
  } catch (err) {
    throw new AppError(ERRORS.INSTITUTE_CREATE_FAILED);
  }
};


// -------------------------------------------------------------
// GET ALL INSTITUTES
// Fetches and returns all institute records.
// -------------------------------------------------------------
exports.getInstitutes = async () => {
  const result = await pool.query(INSTITUTE_QUERIES.GET_ALL_INSTITUTES);
  return result.rows;
};
