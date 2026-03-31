const express = require("express");
const router = express.Router();
const controller = require("./institute.controller");

router.post("/", controller.createInstitute);
router.get("/", controller.getInstitutes);

module.exports = router;