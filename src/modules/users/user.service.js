// =============================================================
// SERVICE: user.service.js
// Handles user creation business logic.
// =============================================================

const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const { AppError, ERRORS } = require("../../config/errors");

// -------------------------------------------------------------
// CREATE USER
// Hashes the password, constructs the full name,
// and inserts a new user record into the database.
// Returns id, full_name, and email on success.
// -------------------------------------------------------------
exports.createUser = async (data) => {
  const { first_name, last_name, email, mobile, password } = data;

  // Hash the plain-text password before storing
  const hashedPassword = await bcrypt.hash(password, 10);

  const full_name = `${first_name} ${last_name}`;

  try {
    const result = await pool.query(
      `INSERT INTO users
        (first_name, last_name, full_name, email, mobile, password_hash)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, full_name, email`,
      [first_name, last_name, full_name, email, mobile, hashedPassword]
    );

    return result.rows[0];
  } catch (err) {
    // PostgreSQL unique violation code for duplicate email
    if (err.code === "23505") {
      throw new AppError(ERRORS.USER_ALREADY_EXISTS);
    }
    throw new AppError(ERRORS.USER_CREATE_FAILED);
  }
};
