const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    billing: {
      type: String,
      required: true,
      enum: ["Monthly", "Yearly"],
      default: "Monthly",
    },

    badge: {
      type: String,
      enum: ["Basic", "Popular", "Enterprise"],
      default: "Basic",
    },

    users: {
      type: Number,
      default: 0,
    },

    revenueForecast: {
      type: Number,
      default: 0,
    },

    features: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plan", planSchema);