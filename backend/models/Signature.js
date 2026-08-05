const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema(
  {
    signatureName: {
      type: String,
      required: true,
      trim: true,
    },

    signatureId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    user: {
      type: String,
      required: true,
      trim: true,
    },

    style: {
      type: String,
      enum: ["Autograph", "Signature", "Handwriting"],
      default: "Signature",
    },

    status: {
      type: String,
      enum: ["Completed", "Processing", "Failed"],
      default: "Processing",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Signature", signatureSchema);