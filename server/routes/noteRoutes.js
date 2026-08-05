const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    addNote,
    getLeadNotes,
} = require("../controllers/noteController");

// ==============================
// Get all notes for a lead
// ==============================
router.get(
    "/:leadId",
    protect,
    authorizeRoles("admin", "member"),
    getLeadNotes
);

// ==============================
// Add a note to a lead
// ==============================
router.post(
    "/:leadId",
    protect,
    authorizeRoles("admin", "member"),
    addNote
);

module.exports = router;