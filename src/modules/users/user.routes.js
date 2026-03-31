// =============================================================
// ROUTES: user.routes.js
// User management endpoints:
//   POST /  — Create a new user
// =============================================================

const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.post("/", userController.createUser);

module.exports = router;
