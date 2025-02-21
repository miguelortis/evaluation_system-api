const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
  {
    evaluation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evaluation",
      required: true,
    },
    evaluator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    responses: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EvaluationResponse", evaluationSchema);
