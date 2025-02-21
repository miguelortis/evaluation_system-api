const express = require("express");
const router = express.Router();
const { generateEmployeeReport } = require("../controllers/reportController");
const auth = require("../middleware/auth");

router.get("/employee/:id", auth(["admin", "manager"]), generateEmployeeReport);

module.exports = router;
