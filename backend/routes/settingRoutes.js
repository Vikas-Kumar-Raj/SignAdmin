const express = require("express");

const {
  getSettings,
  updateSettings,
} = require("../controllers/settingController");

const router = express.Router();

// Get Settings

router.get("/", getSettings);

// Update Settings

router.put("/", updateSettings);

module.exports = router;