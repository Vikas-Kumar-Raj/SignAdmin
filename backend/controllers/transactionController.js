const Transaction = require("../models/Transaction");

const createTransaction = async (req, res) => {
  try {
    const {
      orderId,
      userName,
      email,
      plan,
      amount,
      status,
      paymentMethod,
      transactionDate,
    } = req.body;

    const existingTransaction = await Transaction.findOne({
      orderId,
    });

    if (existingTransaction) {
      return res.status(400).json({
        success: false,
        message: "Order ID already exists",
      });
    }

    const transaction = await Transaction.create({
      orderId,
      userName,
      email,
      plan,
      amount,
      status,
      paymentMethod,
      transactionDate,
    });

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTransactions = async (req, res) => {
  try {

    const transactions = await Transaction.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTransactionById = async (req, res) => {
  try {

    const transaction = await Transaction.findById(
      req.params.id
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      transaction,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTransaction = async (req, res) => {
  try {

    const transaction = await Transaction.findById(
      req.params.id
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    transaction.orderId =
      req.body.orderId || transaction.orderId;

    transaction.userName =
      req.body.userName || transaction.userName;

    transaction.email =
      req.body.email || transaction.email;

    transaction.plan =
      req.body.plan || transaction.plan;

    transaction.amount =
      req.body.amount ?? transaction.amount;

    transaction.status =
      req.body.status || transaction.status;

    transaction.paymentMethod =
      req.body.paymentMethod ||
      transaction.paymentMethod;

    transaction.transactionDate =
      req.body.transactionDate ||
      transaction.transactionDate;

    const updatedTransaction =
      await transaction.save();

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      transaction: updatedTransaction,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {

    const transaction = await Transaction.findById(
      req.params.id
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};