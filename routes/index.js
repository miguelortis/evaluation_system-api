const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const feedbackRoutes = require("./feedbackRoutes");
const employeesRoutes = require("./employeesRoutes");
const evaluationRoutes = require("./evaluationsRoutes");
const evaluationsResponseRoutes = require("./evaluationsResponseRoutes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/employees", employeesRoutes);
router.use("/evaluations", evaluationRoutes);
router.use("/evaluations-res", evaluationsResponseRoutes);

module.exports = router;
