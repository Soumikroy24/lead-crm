const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        company: {
            type: String,
            trim: true,
        },

        status: {
            type: String,
            enum: [
                "New",
                "Contacted",
                "Qualified",
                "Proposal Sent",
                "Won",
                "Lost",
            ],
            default: "New",
        },

        source: {
            type: String,
            enum: [
                "Website",
                "Referral",
                "LinkedIn",
                "Facebook",
                "Instagram",
                "Cold Call",
                "Email",
                "Other",
            ],
            default: "Other",
        },

        notes: {
            type: String,
            default: "",
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        // Null for public submissions, populated for authenticated users
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Lead", leadSchema);