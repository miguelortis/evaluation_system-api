const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    evaluation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evaluation",
      required: true,
    },
    feedback: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
