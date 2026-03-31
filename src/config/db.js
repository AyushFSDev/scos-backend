// =============================================================
// CONFIG: db.js
// Creates and exports a PostgreSQL connection pool.
// All database modules import this pool to run queries.
// =============================================================

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;