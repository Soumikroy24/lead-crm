const Note = require("../models/Note");

// ==============================
// Add Note to a Lead
// ==============================
const addNote = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim() === "") {
            return res.status(400).json({
                message: "Note text is required.",
            });
        }

        const note = await Note.create({
            lead: req.params.leadId,
            user: req.user._id,
            text,
        });

        const populatedNote = await Note.findById(note._id).populate(
            "user",
            "name email role"
        );

        res.status(201).json({
            message: "Note added successfully.",
            note: populatedNote,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            error: error.message,
        });
    }
};

// ==============================
// Get All Notes for a Lead
// ==============================
const getLeadNotes = async (req, res) => {
    try {
        const notes = await Note.find({
            lead: req.params.leadId,
        })
            .populate("user", "name email role")
            .sort("-createdAt");

        res.status(200).json({
            count: notes.length,
            notes,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            error: error.message,
        });
    }
};

module.exports = {
    addNote,
    getLeadNotes,
};