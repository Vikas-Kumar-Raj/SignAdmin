const express = require("express");

const {
  getPlans,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
} = require("../controllers/planController");

const router = express.Router();

// Get All Plans
router.get("/", getPlans);

// Get Single Plan
router.get("/:id", getPlan);

// Create Plan
router.post("/", createPlan);

// Update Plan
router.put("/:id", updatePlan);

// Delete Plan
router.delete("/:id", deletePlan);

module.exports = router;