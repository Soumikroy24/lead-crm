const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists.",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        // Generate JWT token
        const token = generateToken(user);

        // Send response
        res.status(201).json({
            message: "User registered successfully.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            error: error.message,
        });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials.",
            });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Send response
        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            error: error.message,
        });
    }
};

// Get Logged-in User Profile
const getProfile = async (req, res) => {
    res.status(200).json({
        message: "Profile fetched successfully.",
        user: req.user,
    });
};

// Get All Members (Admin Only)
const getAllMembers = async (req, res) => {
    try {
        const members = await User.find(
            { role: "member" },
            "_id name email role"
        );

        res.status(200).json({
            count: members.length,
            members,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            error: error.message,
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    getAllMembers,
};