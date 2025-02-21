const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    evaluator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: { type: Number, required: true },
    feedback: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evaluation", evaluationSchema);
