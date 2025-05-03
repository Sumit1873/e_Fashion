const roleModel = require("../models/RoleModel");


const getAllRoles = async (req, res) => {
  try {
    const roles = await roleModel.find();
    res.status(200).json({
      message: "Roles fetched successfully.",
      data: roles,
    });
  } catch (error) {
    console.error(" Error fetching roles:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


const getRoleById = async (req, res) => {
  try {
    const role = await roleModel.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }
    res.status(200).json({
      message: "Role fetched successfully.",
      data: role,
    });
  } catch (error) {
    console.error("Error fetching role:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const addRole = async (req, res) => {
  try {
    const { name, description } = req.body;

   
    const existingRole = await roleModel.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ message: "Role already exists." });
    }

    const newRole = await roleModel.create({ name, description });
    res.status(201).json({
      message: "Role created successfully.",
      data: newRole,
    });
  } catch (error) {
    console.error("Error adding role:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const deleteRole = async (req, res) => {
  try {
    const deletedRole = await roleModel.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found." });
    }
    res.status(200).json({
      message: "Role deleted successfully.",
      data: deletedRole,
    });
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  addRole,
  deleteRole,
};
