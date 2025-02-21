const Evaluation = require("../models/Evaluation");
const EvaluationRes = require("../models/EvaluationResponse");
const { checkRequiredFields } = require("../utils/validationUtils");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

/**
 * Register new evaluation response
 * URL: POST /api/evaluations-res/register
 */
const createEvaluationResponse = async (req, res) => {
  const { responses, evaluationId, evaluator, userId } = req.body;
  try {
    checkRequiredFields(req.body, [
      "responses",
      "evaluationId",
      "evaluator",
      "userId",
    ]);

    if (
      !mongoose.isValidObjectId(evaluationId) ||
      !mongoose.isValidObjectId(userId)
    ) {
      throw new Error("Invalid evaluationId or userId");
    }

    const evaluation = await Evaluation.findOne(
      { _id: evaluationId, "assignedUsers.user": new ObjectId(userId) },
      { "assignedUsers.$": 1 }
    );

    if (!evaluation) {
      throw new Error("Evaluation not found");
    }

    const userStatus = evaluation.assignedUsers[0].status;
    if (userStatus === "completed") {
      throw "Evaluation already completed";
    }

    const evaluationRes = new EvaluationRes({
      responses,
      evaluation: evaluationId,
      evaluator,
      createdBy: userId,
    });
    await evaluationRes.save();

    const updateResult = await Evaluation.updateOne(
      { _id: evaluationId, "assignedUsers.user": new ObjectId(userId) },
      { $set: { "assignedUsers.$.status": "completed" } }
    );

    if (updateResult.nModified === 0) {
      throw new Error("User not found or status not updated");
    }

    return res.status(201).send(evaluationRes);
  } catch (error) {
    return res.status(400).send({ message: error });
  }
};

/**
 * Get evaluation response by evaluationId
 * URL: POST /api/evaluations-res/evaluation/:id
 */
const getEvaluationResponseByEvaluationId = async (req, res) => {
  const { evaluationId, userId } = req.query;

  try {
    checkRequiredFields(req.query, ["evaluationId", "userId"]);

    if (
      !mongoose.isValidObjectId(evaluationId) ||
      !mongoose.isValidObjectId(userId)
    ) {
      throw "Invalid evaluationId or userId";
    }

    const evaluationRes = await EvaluationRes.findOne({
      evaluation: evaluationId,
      createdBy: new ObjectId(userId),
    });

    if (!evaluationRes) {
      throw "Evaluation  response not found";
    }

    return res.status(201).send(evaluationRes);
  } catch (error) {
    return res.status(400).send({ message: error });
  }
};

module.exports = {
  createEvaluationResponse,
  getEvaluationResponseByEvaluationId,
};
