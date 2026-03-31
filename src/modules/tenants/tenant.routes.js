const express = require("express");
const router = express.Router();
const controller = require("./tenant.controller");

router.post("/", controller.createTenant);
router.get("/", controller.getTenants);

module.exports = router;