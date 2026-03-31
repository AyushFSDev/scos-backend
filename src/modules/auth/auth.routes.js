const express = require("express");
const router = express.Router();
const controller = require("./auth.controller");


router.post("/login", controller.login);
router.get("/my-institutes-roles", controller.getMyInstitutesRoles);
router.post("/select-context", controller.selectContext);

const authMiddleware = require("../../middleware/authMiddleware");
router.get("/me", authMiddleware, controller.me);
module.exports = router;