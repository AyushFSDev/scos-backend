// src/config/queries.js

const AUTH_QUERIES = {
  GET_USER_BY_EMAIL: `
    SELECT * FROM users WHERE email = $1
  `,

  // Institute ka poora data: city, state, logo bhi aa raha hai
  // Role ka poora data: icon, code, description bhi aa raha hai
  GET_MY_INSTITUTES_ROLES: `
    SELECT
      uir.tenant_id,
      uir.institute_id,
      i.name        AS institute_name,
      i.type        AS institute_type,
      i.logo        AS institute_logo,
      i.city        AS institute_city,
      i.state       AS institute_state,
      json_agg(
        json_build_object(
          'role_id',          r.id,
          'role_name',        r.name,
          'role_code',        r.code,
          'role_icon',        r.icon,
          'role_icon_color',  r.icon_color,
          'role_description', r.description
        )
      ) AS roles
    FROM user_institute_roles uir
    JOIN institutes i ON i.id = uir.institute_id
    JOIN roles     r ON r.id = uir.role_id
    WHERE uir.user_id = $1
    GROUP BY
      uir.tenant_id,
      uir.institute_id,
      i.name, i.type, i.logo, i.city, i.state
  `,

  CHECK_CONTEXT_MAPPING: `
    SELECT * FROM user_institute_roles
    WHERE user_id = $1 AND tenant_id = $2 AND institute_id = $3 AND role_id = $4
  `,
};

const USER_QUERIES = {
  CREATE_USER: `
    INSERT INTO users
      (first_name, last_name, full_name, email, mobile, password_hash)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, full_name, email
  `,
};

const INSTITUTE_QUERIES = {
  CREATE_INSTITUTE: `
    INSERT INTO institutes (tenant_id, name, code, type, logo, city, state)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `,
  GET_ALL_INSTITUTES: `SELECT * FROM institutes`,
};

const ROLE_QUERIES = {
  CREATE_ROLE: `
    INSERT INTO roles (name, code, icon, description)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `,
  GET_ALL_ROLES: `SELECT * FROM roles`,
};

const MAPPING_QUERIES = {
  CHECK_DUPLICATE_MAPPING: `
    SELECT * FROM user_institute_roles
    WHERE user_id = $1 AND institute_id = $2 AND role_id = $3
  `,
  CREATE_MAPPING: `
    INSERT INTO user_institute_roles
      (tenant_id, user_id, institute_id, role_id, is_primary)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `,
  GET_ALL_MAPPINGS: `
    SELECT
      uir.*,
      u.full_name,
      i.name AS institute_name,
      r.name AS role_name
    FROM user_institute_roles uir
    JOIN users      u ON u.id = uir.user_id
    JOIN institutes i ON i.id = uir.institute_id
    JOIN roles      r ON r.id = uir.role_id
  `,
};

module.exports = {
  AUTH_QUERIES,
  USER_QUERIES,
  INSTITUTE_QUERIES,
  ROLE_QUERIES,
  MAPPING_QUERIES,
};
