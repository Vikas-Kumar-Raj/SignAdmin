const Setting = require("../models/Setting");

// Get Settings

const getSettings = async (req, res) => {
  try {

    let setting = await Setting.findOne();

    if (!setting) {

      setting = await Setting.create({
        welcomeCredits: 50,
        creditsPerSignature: 15,
        multiplier: 1.5,
      });

    }

    res.status(200).json({
      success: true,
      setting,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update Settings

const updateSettings = async (req, res) => {
  try {

    let setting = await Setting.findOne();

    if (!setting) {

      setting = await Setting.create(req.body);

    } else {

      setting = await Setting.findByIdAndUpdate(
        setting._id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    }

    res.status(200).json({
      success: true,
      message: "Settings Updated Successfully",
      setting,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getSettings,
  updateSettings,
};
