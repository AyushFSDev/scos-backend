// src/config/errors.js
// =====================================================
// 📌 CENTRAL ERRORS FILE
// Saare error codes, messages aur HTTP status yahan hain.
// Usage: const { AppError, ERRORS } = require("../../config/errors");
// =====================================================

// ─────────────────────────────────────────────
// 🏗️ AppError CLASS
// Custom error class jo message + statusCode + code rakhti hai
// ─────────────────────────────────────────────
class AppError extends Error {
  constructor(errorDef) {
    super(errorDef.message);
    this.statusCode = errorDef.statusCode;
    this.code = errorDef.code;
    this.name = "AppError";
  }
}

// ─────────────────────────────────────────────
// 📋 ERROR DEFINITIONS
// ─────────────────────────────────────────────
const ERRORS = {

  // ── AUTH ERRORS ──────────────────────────────
  INVALID_CREDENTIALS: {
    code: "AUTH_001",
    message: "Invalid email or password.",
    statusCode: 401,
  },
  USER_NOT_FOUND: {
    code: "AUTH_002",
    message: "User not found.",
    statusCode: 404,
  },
  NO_INSTITUTE_ASSIGNED: {
    code: "AUTH_003",
    message: "No institute assigned to this account. Contact admin.",
    statusCode: 403,
  },
  INVALID_TOKEN: {
    code: "AUTH_004",
    message: "Invalid or expired token.",
    statusCode: 401,
  },
  TOKEN_TYPE_MISMATCH: {
    code: "AUTH_005",
    message: "Invalid token type for this operation.",
    statusCode: 403,
  },
  INVALID_CONTEXT: {
    code: "AUTH_006",
    message: "Selected institute/role mapping does not exist for this user.",
    statusCode: 403,
  },
  MISSING_TOKEN: {
    code: "AUTH_007",
    message: "Authorization token is missing.",
    statusCode: 401,
  },

  // ── USER ERRORS ──────────────────────────────
  USER_ALREADY_EXISTS: {
    code: "USER_001",
    message: "A user with this email already exists.",
    statusCode: 409,
  },
  USER_CREATE_FAILED: {
    code: "USER_002",
    message: "Failed to create user. Please try again.",
    statusCode: 500,
  },

  // ── INSTITUTE ERRORS ─────────────────────────
  INSTITUTE_NOT_FOUND: {
    code: "INST_001",
    message: "Institute not found.",
    statusCode: 404,
  },
  INSTITUTE_CREATE_FAILED: {
    code: "INST_002",
    message: "Failed to create institute.",
    statusCode: 500,
  },

  // ── ROLE ERRORS ──────────────────────────────
  ROLE_NOT_FOUND: {
    code: "ROLE_001",
    message: "Role not found.",
    statusCode: 404,
  },
  ROLE_CREATE_FAILED: {
    code: "ROLE_002",
    message: "Failed to create role.",
    statusCode: 500,
  },

  // ── MAPPING ERRORS ───────────────────────────
  MAPPING_ALREADY_EXISTS: {
    code: "MAP_001",
    message: "This user-institute-role mapping already exists.",
    statusCode: 409,
  },
  MAPPING_CREATE_FAILED: {
    code: "MAP_002",
    message: "Failed to create mapping.",
    statusCode: 500,
  },

  // ── GENERIC ERRORS ───────────────────────────
  INTERNAL_SERVER_ERROR: {
    code: "SERVER_001",
    message: "Something went wrong. Please try again later.",
    statusCode: 500,
  },
  VALIDATION_FAILED: {
    code: "SERVER_002",
    message: "Required fields are missing or invalid.",
    statusCode: 400,
  },
};

// ─────────────────────────────────────────────
// 🛡️ GLOBAL ERROR HANDLER MIDDLEWARE
// app.js mein sabse last mein add karo:
// app.use(globalErrorHandler);
// ─────────────────────────────────────────────
const globalErrorHandler = (err, req, res, next) => {
  // Agar AppError hai to uska hi statusCode use karo
  if (err.name === "AppError") {
    return res.status(err.statusCode).json({
      success: false,
      code: err.code,
      message: err.message,
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    const e = ERRORS.INVALID_TOKEN;
    return res.status(e.statusCode).json({
      success: false,
      code: e.code,
      message: e.message,
    });
  }

  // Baaki unexpected errors
  console.error("Unhandled Error:", err);
  const e = ERRORS.INTERNAL_SERVER_ERROR;
  return res.status(e.statusCode).json({
    success: false,
    code: e.code,
    message: e.message,
  });
};

module.exports = { AppError, ERRORS, globalErrorHandler };
