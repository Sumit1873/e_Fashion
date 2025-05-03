const userModel = require("../models/UserModel");

const mailUtil = require("../utils/MailUtil")

const bcrypt = require("bcrypt");



const getAllUser = async (req, res) => {
  const allUser = await userModel.find().populate("roleId")
  res.status(200).send({
    message: "all User",
    data: allUser
  })
}

const signup = async (req, res) => {
  try {
    if (!req.body.password || typeof req.body.password !== "string") {
      return res.status(400).json({ message: "Invalid password input" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const createdUser = await userModel.create(req.body);
    await mailUtil.sendingMail(createdUser.email, "welcome to eFashion", "this is welcome mail")

    res.status(201).json({
      message: "User created successfully",
      data: createdUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error",
      data: err.message,
    });
  }
};



const loginUser = async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  const foundUserFromEmail = await userModel.findOne({ email: email }).populate("roleId");
  console.log(foundUserFromEmail);

  if (foundUserFromEmail != null) {

    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);

    if (isMatch == true) {
      foundUserFromEmail.loginHistory.push(new Date());
      await foundUserFromEmail.save();
      res.status(200).json({
        message: "login success",
        data: foundUserFromEmail,
      });
    } else {
      res.status(404).json({
        message: "invalid cred..",
      });
    }
  } else {
    res.status(404).json({
      message: "Email not found..",
    });
  }
};


const getUserById = async (req, res) => {
  try {
    const foundUser = await userModel.findById(req.params.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({
      message: "User fetched successfully.",
      data: foundUser,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({
      message: "User deleted successfully.",
      data: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const userByName = async (req, res) => {
  try {
    const { firstName } = req.params; // Get name from URL parameters

    if (!firstName) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Find user by name (case-insensitive)
    const user = await userModel.findOne({ firstName: new RegExp(`^${firstName}$`, "i") });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Return user details
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const countUsersByRole = async (req, res) => {
  try {
    const result = await userModel.aggregate([
      {
        $group: {
          _id: "$roleId", // group by roleId
          count: { $sum: 1 } // count users per roleId
        }
      },
      {
        $lookup: {
          from: "roles", // make sure this matches the actual collection name
          localField: "_id",
          foreignField: "_id",
          as: "role"
        }
      },
      {
        $unwind: "$role"
      },
      {
        $project: {
          _id: 0,
          roleId: "$_id",
          roleName: "$role.name", // assuming your role model has a 'name' field
          count: 1
        }
      }
    ]);

    res.status(200).json({
      message: "User count by role",
      data: result
    });
  } catch (error) {
    console.error("Error counting users by role:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

const getUsersByRole = async (req, res) => {
  const { roleId } = req.params;

  try {
    const users = await userModel.find({ roleId }).select("-password"); // exclude password for safety

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

const getMonthlySignups = async (req, res) => {
  try {
    const signups = await userModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({ data: signups });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch signup data." });
  }
}

const getMonthlyLogins = async (req, res) => {
  try {
    const logins = await userModel.aggregate([
      { $unwind: "$loginHistory" }, // explode loginHistory array
      {
        $group: {
          _id: { $month: "$loginHistory" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({ data: logins });
  } catch (err) {
    console.error("Login stats error:", err);
    res.status(500).json({ error: "Failed to fetch login data." });
  }
}


module.exports = {
  signup,
  loginUser,
  getAllUser,
  getUserById,
  deleteUserById,
  userByName,
  getUserProfile,
  updateUserProfile,
  countUsersByRole,
  getUsersByRole,
  getMonthlySignups,
  getMonthlyLogins
};
