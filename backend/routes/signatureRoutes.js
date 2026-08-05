const express = require("express");

const {
  createSignature,
  getSignatures,
  getSignatureById,
  updateSignature,
  deleteSignature,
} = require("../controllers/signatureController");

const router = express.Router();

router.post("/", createSignature);

router.get("/", getSignatures);

router.get("/:id", getSignatureById);

router.put("/:id", updateSignature);

router.delete("/:id", deleteSignature);

module.exports = router;