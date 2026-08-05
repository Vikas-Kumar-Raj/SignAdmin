const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    userName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    plan: {
      type: String,
      enum: [
        "Enterprise Elite",
        "Professional",
        "Standard",
      ],
      default: "Standard",
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Success",
        "Pending",
        "Failed",
      ],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: [
        "UPI",
        "Card",
        "Net Banking",
        "Cash",
      ],
      default: "UPI",
    },

    transactionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Transaction",
  transactionSchema
);