const express = require("express");
const router = express.Router();

const evaluationRoutes = require("./evaluationsRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const feedbackRoutes = require("./feedbackRoutes");
const reportsRoutes = require("./reportsRoutes");
const employeesRoutes = require("./employeesRoutes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/evaluations", evaluationRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/reports", reportsRoutes);
router.use("/employees", employeesRoutes);

module.exports = router;
