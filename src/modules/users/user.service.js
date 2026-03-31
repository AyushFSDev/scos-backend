const pool = require("../../config/db");
const bcrypt = require("bcrypt");

exports.createUser = async (data) => {
  const { first_name, last_name, email, mobile, password } = data;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const full_name = `${first_name} ${last_name}`;

  const result = await pool.query(
    `INSERT INTO users 
    (first_name, last_name, full_name, email, mobile, password_hash)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, full_name, email`,
    [first_name, last_name, full_name, email, mobile, hashedPassword]
  );

  return result.rows[0];
};