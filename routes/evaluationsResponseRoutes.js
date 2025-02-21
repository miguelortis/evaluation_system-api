const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createEvaluationResponse,
} = require("../controllers/evaluationResponseController");

router.post(
  "/register",
  auth(["admin", "manager", "employee"]),
  createEvaluationResponse
);

module.exports = router;
