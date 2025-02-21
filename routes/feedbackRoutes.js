const express = require("express");
const router = express.Router();
const { newFeedback } = require("../controllers/feedbackController");
const auth = require("../middleware/auth");

router.post("/", auth(["admin", "manager", "employee"]), newFeedback);

module.exports = router;
