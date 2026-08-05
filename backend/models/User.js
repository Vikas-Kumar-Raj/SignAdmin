const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    userType: {
      type: String,
      enum: ["Basic", "Premium", "Enterprise"],
      default: "Basic",
    },

    status: {
      type: String,
      enum: ["Active", "Blocked", "Pending"],
      default: "Active",
    },

    credits: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
