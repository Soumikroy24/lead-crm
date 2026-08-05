const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    createLead,
    getAllLeads,
    getLeadById,
    updateLead,
    assignLead,
    deleteLead,
    getLeadActivities,
} = require("../controllers/leadController");

// ==============================
// Public Route
// ==============================

// Anyone can submit a lead
router.post("/public", createLead);

// ==============================
// Protected Routes
// ==============================

// Create Lead (Admin & Member)
router.post(
    "/",
    protect,
    authorizeRoles("admin", "member"),
    createLead
);

// Get All Leads (Admin & Member)
router.get(
    "/",
    protect,
    authorizeRoles("admin", "member"),
    getAllLeads
);

// Get Lead By ID (Admin & Member)
router.get(
    "/:id",
    protect,
    authorizeRoles("admin", "member"),
    getLeadById
);

// Get Lead Activity Timeline (Admin & Member)
router.get(
    "/:id/activity",
    protect,
    authorizeRoles("admin", "member"),
    getLeadActivities
);

// Update Lead (Admin & Member)
router.put(
    "/:id",
    protect,
    authorizeRoles("admin", "member"),
    updateLead
);

// Assign Lead (Admin Only)
router.put(
    "/:id/assign",
    protect,
    authorizeRoles("admin"),
    assignLead
);

// Delete Lead (Admin Only)
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteLead
);

module.exports = router;