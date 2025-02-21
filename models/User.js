const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "employee",
      enum: ["admin", "manager", "employee"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
