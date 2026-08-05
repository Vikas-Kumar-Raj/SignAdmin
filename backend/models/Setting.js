const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    welcomeCredits: {
      type: Number,
      default: 50,
    },

    creditsPerSignature: {
      type: Number,
      default: 15,
    },

    multiplier: {
      type: Number,
      default: 1.5,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Setting", settingSchema);