// =============================================================
// SERVICE: auth.service.js
// Handles all authentication business logic:
//   - Login with email/password
//   - Fetching institute-role options for a user
//   - Validating and issuing an access token for a selected context
// =============================================================

const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AUTH_QUERIES } = require("../../config/queries");
const { AppError, ERRORS } = require("../../config/errors");

// -------------------------------------------------------------
// LOGIN
// Validates credentials and returns a pre_context JWT.
// The client must call /select-context next to get an access token.
// -------------------------------------------------------------
exports.login = async (email, password) => {
  const userRes = await pool.query(AUTH_QUERIES.GET_USER_BY_EMAIL, [email]);

  if (userRes.rows.length === 0) {
    throw new AppError(ERRORS.INVALID_CREDENTIALS);
  }

  const user = userRes.rows[0];

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new AppError(ERRORS.INVALID_CREDENTIALS);
  }

  // Issue a short-lived pre_context token — not valid for protected routes
  const token = jwt.sign(
    { user_id: user.id, email: user.email, token_type: "pre_context" },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return { token, user };
};


// -------------------------------------------------------------
// GET MY INSTITUTES & ROLES
// Returns all institute-role combinations assigned to the user.
// Used to populate the context-selection screen after login.
// -------------------------------------------------------------
exports.getMyInstitutesRoles = async (user_id) => {
  const result = await pool.query(AUTH_QUERIES.GET_MY_INSTITUTES_ROLES, [user_id]);

  if (result.rows.length === 0) {
    throw new AppError(ERRORS.NO_INSTITUTE_ASSIGNED);
  }

  return result.rows;
};


// -------------------------------------------------------------
// SELECT CONTEXT
// Verifies the chosen institute/role mapping exists for the user,
// then issues a full access token embedding the selected context.
// -------------------------------------------------------------
exports.selectContext = async (user_id, tenant_id, institute_id, role_id) => {
  const check = await pool.query(AUTH_QUERIES.CHECK_CONTEXT_MAPPING, [
    user_id, tenant_id, institute_id, role_id,
  ]);

  if (check.rows.length === 0) {
    throw new AppError(ERRORS.INVALID_CONTEXT);
  }

  // Access token carries full context — used by authMiddleware on all protected routes
  const token = jwt.sign(
    { user_id, tenant_id, institute_id, role_id, token_type: "access" },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return token;
};
