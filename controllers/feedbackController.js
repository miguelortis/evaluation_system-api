const Feedback = require("../models/Feedback");

/**
 * Register new feedback
 * URL: POST /api/feedback/
 */
const newFeedback = async (req, res) => {
  const { evaluationId, feedback } = req.body;
  try {
    const question = new Feedback({ evaluationId, feedback });
    await question.save();
    res.status(201).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  newFeedback,
};
