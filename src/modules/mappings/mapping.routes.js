const express = require("express");
const router = express.Router();
const controller = require("./mapping.controller");

router.post("/", controller.createMapping);
router.get("/", controller.getMappings);

module.exports = router;