const express = require("express");
const routes = express.Router();
const userController = require("../controllers/UserController");

// User Authentication Routes
routes.post("/signup", userController.signup);
routes.post("/login", userController.loginUser);
routes.get("/allUser", userController.getAllUser);
routes.get("/user/:id", userController.getUserById);
routes.delete("/users/:id", userController.deleteUserById);
routes.get("firstName/:firstName", userController.userByName);
routes.get("/userprofile/:userId", userController.getUserProfile);
routes.put("/profile/:userId", userController.updateUserProfile);
routes.get("/count-by-role", userController.countUsersByRole);
routes.get("/by-role/:roleId", userController.getUsersByRole);
routes.get("/monthly-signups", userController.getMonthlySignups);
routes.get("/monthly-logins", userController.getMonthlyLogins);




module.exports = routes;