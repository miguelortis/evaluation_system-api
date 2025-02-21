const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createEvaluationResponse,
  getEvaluationResponseByEvaluationId,
} = require("../controllers/evaluationResponseController");

router.post(
  "/register",
  auth(["admin", "manager", "employee"]),
  createEvaluationResponse
);

router.get(
  "/evaluation",
  auth(["admin", "manager", "employee"]),
  getEvaluationResponseByEvaluationId
);

module.exports = router;
