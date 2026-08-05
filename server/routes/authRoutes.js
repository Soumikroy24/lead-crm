const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile,
    getAllMembers,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes
router.get("/profile", protect, getProfile);

// Admin Only
router.get(
    "/members",
    protect,
    authorizeRoles("admin"),
    getAllMembers
);

module.exports = router;