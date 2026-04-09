const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User with given ID was not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error("[USER-CONTROLLER] Error:", err.message);
    res.status(400).json({
      success: false,
      error: "Invalid User ID format",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User with given ID was not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("[USER-CONTROLLER] Error:", err.message);
    res.status(400).json({
      success: false,
      error: "Invalid User ID format",
    });
  }
};

module.exports = { getUser, deleteUser };
