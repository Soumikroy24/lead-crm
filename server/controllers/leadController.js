const Lead = require("../models/Lead");
const Activity = require("../models/Activity");
const logActivity = require("../utils/logActivity");

// Create Lead
const createLead = async (req, res) => {
    try {
        const leadData = {
            ...req.body,
        };

        // If request comes from a logged-in user
        if (req.user) {
            leadData.createdBy = req.user._id;
        } else {
            // Public submission
            leadData.status = "New";
        }

        const lead = await Lead.create(leadData);

        await logActivity({
            lead: lead._id,
            user: req.user?._id,
            action: "Lead Created",
            details: req.user
                ? "Lead created by authenticated user"
                : "Lead submitted through public form",
        });

        res.status(201).json({
            message: "Lead created successfully.",
            lead,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            error: error.message,
        });
    }
};

// Get All Leads (Search + Filter + Pagination + Sorting)
const getAllLeads = async (req, res) => {
    try {
        const {
            search,
            status,
            source,
            page = 1,
            limit = 10,
            sort = "-createdAt",
        } = req.query;

        const query = {};

        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    company: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        if (status && status !== "All") {
            query.status = status;
        }

        if (source && source !== "All") {
            query.source = source;
        }

        const leads = await Lead.find(query)
            .populate("createdBy", "name email role")
            .populate("assignedTo", "name email role")
            .sort(sort)
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));

        const total = await Lead.countDocuments(query);

        res.status(200).json({
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            count: leads.length,
            leads,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            error: error.message,
        });
    }
};

// Get Lead By ID
const getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id)
            .populate("createdBy", "name email role")
            .populate("assignedTo", "name email role");

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found.",
            });
        }

        res.status(200).json({
            lead,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            error: error.message,
        });
    }
};

// Update Lead
const updateLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
            .populate("createdBy", "name email role")
            .populate("assignedTo", "name email role");

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found.",
            });
        }

        await logActivity({
            lead: lead._id,
            user: req.user._id,
            action: "Lead Updated",
            details: "Lead details updated",
        });

        res.status(200).json({
            message: "Lead updated successfully.",
            lead,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            error: error.message,
        });
    }
};

// Assign Lead (Admin Only)
const assignLead = async (req, res) => {
    try {
        const { assignedTo } = req.body;

        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            { assignedTo },
            {
                new: true,
                runValidators: true,
            }
        )
            .populate("createdBy", "name email role")
            .populate("assignedTo", "name email role");

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found.",
            });
        }

        await logActivity({
            lead: lead._id,
            user: req.user._id,
            action: "Lead Assigned",
            details: `Assigned to ${lead.assignedTo?.name || "member"}`,
        });

        res.status(200).json({
            message: "Lead assigned successfully.",
            lead,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            error: error.message,
        });
    }
};

// Delete Lead
const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found.",
            });
        }

        await logActivity({
            lead: lead._id,
            user: req.user._id,
            action: "Lead Deleted",
            details: `Deleted lead "${lead.name}"`,
        });

        res.status(200).json({
            message: "Lead deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            error: error.message,
        });
    }
};

// Get Lead Activity Timeline
const getLeadActivities = async (req, res) => {
    try {
        const activities = await Activity.find({
            lead: req.params.id,
        })
            .populate("user", "name email role")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: activities.length,
            activities,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error.",
            error: error.message,
        });
    }
};

module.exports = {
    createLead,
    getAllLeads,
    getLeadById,
    updateLead,
    assignLead,
    deleteLead,
    getLeadActivities,
};