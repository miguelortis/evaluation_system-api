const EvaluationRes = require("../models/EvaluationResponse");
const { checkRequiredFields } = require("../utils/validationUtils");

/**
 * Register new evaluation response
 * URL: POST /api/evaluations-res/register
 */
const createEvaluationResponse = async (req, res) => {
  const { responses, evaluationId, evaluator } = req.body;
  try {
    checkRequiredFields(req.body, ["responses", "evaluationId", "evaluator"]);

    const evaluationRes = new EvaluationRes({
      responses,
      evaluation: evaluationId,
      evaluator,
    });
    await evaluationRes.save();
    return res.status(201).send(evaluationRes);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  createEvaluationResponse,
};
