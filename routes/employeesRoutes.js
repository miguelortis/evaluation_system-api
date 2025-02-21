const express = require("express");
const router = express.Router();
const { getEmployees } = require("../controllers/employeeController");
const auth = require("../middleware/auth");

router.get("/", auth(["admin", "manager"]), getEmployees);

module.exports = router;
