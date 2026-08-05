const Signature = require("../models/Signature");

const createSignature = async (req, res) => {
  try {
    const {
      signatureName,
      signatureId,
      user,
      style,
      status,
    } = req.body;

    const existingSignature = await Signature.findOne({
      signatureId,
    });

    if (existingSignature) {
      return res.status(400).json({
        success: false,
        message: "Signature ID already exists",
      });
    }

    const signature = await Signature.create({
      signatureName,
      signatureId,
      user,
      style,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Signature created successfully",
      signature,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSignatures = async (req, res) => {
  try {
    const signatures = await Signature.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: signatures.length,
      signatures,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSignatureById = async (req, res) => {
  try {
    const signature = await Signature.findById(req.params.id);

    if (!signature) {
      return res.status(404).json({
        success: false,
        message: "Signature not found",
      });
    }

    res.status(200).json({
      success: true,
      signature,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateSignature = async (req, res) => {
  try {
    const signature = await Signature.findById(req.params.id);

    if (!signature) {
      return res.status(404).json({
        success: false,
        message: "Signature not found",
      });
    }

    signature.signatureName =
      req.body.signatureName || signature.signatureName;

    signature.signatureId =
      req.body.signatureId || signature.signatureId;

    signature.user =
      req.body.user || signature.user;

    signature.style =
      req.body.style || signature.style;

    signature.status =
      req.body.status || signature.status;

    const updatedSignature = await signature.save();

    res.status(200).json({
      success: true,
      message: "Signature updated successfully",
      signature: updatedSignature,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteSignature = async (req, res) => {
  try {
    const signature = await Signature.findById(req.params.id);

    if (!signature) {
      return res.status(404).json({
        success: false,
        message: "Signature not found",
      });
    }

    await signature.deleteOne();

    res.status(200).json({
      success: true,
      message: "Signature deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSignature,
  getSignatures,
  getSignatureById,
  updateSignature,
  deleteSignature,
};