const Evaluation = require("../models/Evaluation");
const { checkRequiredFields } = require("../utils/validationUtils");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

/**
 * Register new evaluation
 * URL: POST /api/evaluations/register
 */
const createEvaluation = async (req, res) => {
  const { fields, name, createdBy } = req.body;
  try {
    checkRequiredFields(req.body, ["fields", "name", "createdBy"]);
    const evaluation = new Evaluation({ fields, name, createdBy });
    await evaluation.save();
    return res.status(201).send(evaluation);
  } catch (error) {
    return res.status(400).send(error);
  }
};

/**
 * Get evaluation by id
 * URL: GET /api/evaluations/:id
 */
const getEvaluationById = async (req, res) => {
  const { id } = req.params;
  try {
    const evaluation = await Evaluation.findById(id);
    if (!evaluation) {
      return res.status(404).send();
    }
    res.send(evaluation);
  } catch (error) {
    return res.status(500).send(error);
  }
};

/**
 * Get evaluations
 * URL: GET /api/evaluations
 */
const getEvaluations = async (req, res) => {
  try {
    const evaluation = await Evaluation.find();
    if (!evaluation.length) {
      return res.status(404).send();
    }
    return res.send(evaluation);
  } catch (error) {
    return res.status(500).send(error);
  }
};

/**
 * Get evaluation by employee
 * URL: GET /api/evaluations/employee/:id
 */
const getEmployeeEvaluations = async (req, res) => {
  try {
    const evaluation = await Evaluation.find();
    return res.send(evaluation);
  } catch (error) {
    return res.status(500).send(error);
  }
};

/**
 * Update evaluation
 * URL: PUT /api/evaluations/:id
 */
const updateEvaluation = async (req, res) => {
  const { fields, name, assignedUsers } = req?.body;
  const dataToUpdate = {};

  if (assignedUsers) {
    dataToUpdate.$push = { assignedUsers };
  }
  if (fields || name) {
    dataToUpdate.$set = { fields, name };
  }
  try {
    const evaluation = await Evaluation.updateOne(
      { _id: req.params.id },
      dataToUpdate
    );
    if (!evaluation) {
      return res.status(404).send();
    }
    res.send(evaluation);
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * get assigned evaluations by employee id
 * URL: GET /api/evaluations/:id
 */
const getAssignedEvaluationsByEmployeeId = async (req, res) => {
  const { id } = req?.params;
  try {
    const evaluation = await Evaluation.aggregate([
      { $unwind: "$assignedUsers" },
      { $match: { "assignedUsers.user": new ObjectId(id) } },
      {
        $lookup: {
          from: "users",
          localField: "assignedUsers.user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 1,
          name: 1,
          createdAt: 1,
          assignedUsers: {
            user: {
              name: "$userDetails.name",
              email: "$userDetails.email",
            },
            status: "$assignedUsers.status",
          },
        },
      },
    ]);

    if (!evaluation) {
      return res.status(404).send();
    }
    res.send(evaluation);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createEvaluation,
  getEvaluationById,
  getEvaluations,
  getAssignedEvaluationsByEmployeeId,
  getEmployeeEvaluations,
  updateEvaluation,
};
