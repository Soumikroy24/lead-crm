const Activity = require("../models/Activity");

const logActivity = async ({
    lead,
    user = null,
    action,
    details = "",
}) => {
    try {
        await Activity.create({
            lead,
            user,
            action,
            details,
        });
    } catch (error) {
        console.error("Activity Log Error:", error.message);
    }
};

module.exports = logActivity;