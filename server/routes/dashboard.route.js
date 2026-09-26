const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboard.controller");

const authorization = require("../utils/authorization");

router.use(authorization);

router.get("/summary", dashboardController.summary);

module.exports = router;
