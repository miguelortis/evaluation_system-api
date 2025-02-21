const express = require("express");
const router = express.Router();
const {
  createEvaluation,
  getEvaluationById,
  updateEvaluation,
  getEmployeeEvaluations,
  getEvaluations,
  getAssignedEvaluationsByEmployeeId,
} = require("../controllers/evaluationController");
const auth = require("../middleware/auth");

router.get("/", auth(["admin", "manager"]), getEvaluations);

router.post("/register", auth(["admin", "manager"]), createEvaluation);

router.get("/:id", auth(["admin", "manager", "employee"]), getEvaluationById);

router.get(
  "/assigned/:id",
  auth(["admin", "manager", "employee"]),
  getAssignedEvaluationsByEmployeeId
);

router.put("/:id", auth(["admin", "manager"]), updateEvaluation);

router.get(
  "/employee/:id",
  auth(["admin", "manager", "employee"]),
  getEmployeeEvaluations
);

module.exports = router;
