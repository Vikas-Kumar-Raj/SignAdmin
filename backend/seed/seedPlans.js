const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Plan = require("../models/Plan");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const plans = [
  {
    planName: "Basic",
    description: "Perfect for individuals and freelancers.",
    price: 199,
    billing: "Monthly",
    badge: "Basic",
    users: 120,
    revenueForecast: 23880,
    features: [
      "100 Signatures",
      "Basic Analytics",
      "Email Support",
      "1 Team Member"
    ],
    status: "Active"
  },
  {
    planName: "Professional",
    description: "Best choice for startups.",
    price: 499,
    billing: "Monthly",
    badge: "Popular",
    users: 340,
    revenueForecast: 169660,
    features: [
      "Unlimited Signatures",
      "Advanced Analytics",
      "Priority Support",
      "API Access"
    ],
    status: "Active"
  },
  {
    planName: "Enterprise",
    description: "Complete business solution.",
    price: 999,
    billing: "Monthly",
    badge: "Enterprise",
    users: 500,
    revenueForecast: 499500,
    features: [
      "Unlimited Everything",
      "Dedicated Manager",
      "Custom API",
      "24/7 Support"
    ],
    status: "Active"
  },
  {
    planName: "Starter",
    description: "Affordable starter plan.",
    price: 99,
    billing: "Monthly",
    badge: "Basic",
    users: 80,
    revenueForecast: 7920,
    features: [
      "50 Signatures",
      "Email Support",
      "Dashboard"
    ],
    status: "Active"
  },
  {
    planName: "Business",
    description: "Growing business plan.",
    price: 799,
    billing: "Monthly",
    badge: "Popular",
    users: 260,
    revenueForecast: 207740,
    features: [
      "Unlimited Users",
      "Priority Support",
      "Reports",
      "API"
    ],
    status: "Active"
  },
  {
    planName: "Corporate",
    description: "Corporate level subscription.",
    price: 1499,
    billing: "Monthly",
    badge: "Enterprise",
    users: 150,
    revenueForecast: 224850,
    features: [
      "Dedicated Server",
      "Unlimited API",
      "Premium Reports",
      "24x7 Support"
    ],
    status: "Active"
  },
  {
    planName: "Premium Plus",
    description: "Advanced premium package.",
    price: 1299,
    billing: "Monthly",
    badge: "Popular",
    users: 170,
    revenueForecast: 220830,
    features: [
      "Unlimited Storage",
      "AI Reports",
      "Priority API",
      "Phone Support"
    ],
    status: "Active"
  },
  {
    planName: "Student",
    description: "Discount plan for students.",
    price: 49,
    billing: "Monthly",
    badge: "Basic",
    users: 600,
    revenueForecast: 29400,
    features: [
      "Basic Dashboard",
      "Limited Storage",
      "Email Support"
    ],
    status: "Active"
  },
  {
    planName: "Agency",
    description: "For digital agencies.",
    price: 899,
    billing: "Monthly",
    badge: "Popular",
    users: 95,
    revenueForecast: 85405,
    features: [
      "Unlimited Clients",
      "Unlimited Signatures",
      "Reports"
    ],
    status: "Active"
  },
  {
    planName: "Ultimate",
    description: "Everything included.",
    price: 1999,
    billing: "Monthly",
    badge: "Enterprise",
    users: 75,
    revenueForecast: 149925,
    features: [
      "Unlimited Everything",
      "AI Assistant",
      "Custom Branding",
      "Dedicated Support"
    ],
    status: "Active"
  }
];

const importData = async () => {
  try {
    await Plan.deleteMany();

    await Plan.insertMany(plans);

    console.log("10 Plans Inserted Successfully");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

importData();