const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
  {
    fields: [
      {
        id: { type: Number, required: true },
        label: { type: String, required: true },
        type: { type: String, required: true },
        options: [
          {
            label: { type: String },
            value: { type: String },
          },
        ],
      },
    ],
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assignedUsers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
          default: "pending",
          enum: ["completed", "pending"],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evaluation", evaluationSchema);
