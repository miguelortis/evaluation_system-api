const User = require("../models/User");

/**
 * Get employee list
 * URL: GET /api/employees
 */
const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }, { password: 0 });
    if (employees?.length === 0) {
      throw new Error("No employees found");
    }

    res.status(201).send(employees);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getEmployees,
};
