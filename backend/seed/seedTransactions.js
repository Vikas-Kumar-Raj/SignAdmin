const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const Transaction = require("../models/Transaction");

const users = [
  "Vikas Raj",
  "Amit Sharma",
  "Priya Singh",
  "Rahul Verma",
  "Sneha Gupta",
  "Karan Mehta",
  "Anjali Patel",
  "Rohit Kumar",
  "Neha Kapoor",
  "Arjun Malhotra",
  "Riya Saxena",
  "Mohit Yadav",
  "Pooja Verma",
  "Saurabh Mishra",
  "Aakash Singh",
  "Nisha Gupta",
  "Ravi Kumar",
  "Deepak Sharma",
  "Komal Singh",
  "Manish Patel",
];

const plans = [
  "Enterprise Elite",
  "Professional",
  "Standard",
];

const statuses = [
  "Success",
  "Pending",
  "Failed",
];

const methods = [
  "UPI",
  "Card",
  "Net Banking",
];

const transactions = [];

for (let i = 1; i <= 100; i++) {
  transactions.push({
    orderId: `ORD-${1000 + i}`,
    userName: users[Math.floor(Math.random() * users.length)],
    email: `user${i}@gmail.com`,
    plan: plans[Math.floor(Math.random() * plans.length)],
    amount: Math.floor(Math.random() * 5000) + 500,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    paymentMethod: methods[Math.floor(Math.random() * methods.length)],
    transactionDate: new Date(),
  });
}

const importData = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Transaction.deleteMany();

    await Transaction.insertMany(transactions);

    console.log("100 Transactions Inserted Successfully");

    await mongoose.connection.close();

    process.exit(0);

  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

importData();