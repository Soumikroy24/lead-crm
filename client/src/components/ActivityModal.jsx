import { useEffect, useState } from "react";
import { getLeadActivities } from "../services/leadService";

function ActivityModal({
    open,
    onClose,
    leadId,
}) {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && leadId) {
            fetchActivities();
        }
    }, [open, leadId]);

    const fetchActivities = async () => {
        try {
            setLoading(true);

            const data = await getLeadActivities(leadId);

            setActivities(data.activities);
        } catch (error) {
            console.error(error);
            alert("Failed to load activities.");
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div style={overlay}>
            <div style={modal}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <h2>Lead Activity</h2>

                    <button
                        onClick={onClose}
                        style={closeBtn}
                    >
                        ✕
                    </button>
                </div>

                {loading ? (
                    <h3>Loading...</h3>
                ) : activities.length === 0 ? (
                    <p>No activities found.</p>
                ) : (
                    <div>
                        {activities.map((activity) => (
                            <div
                                key={activity._id}
                                style={card}
                            >
                                <h3
                                    style={{
                                        margin: 0,
                                        color: "#2563eb",
                                    }}
                                >
                                    {activity.action}
                                </h3>

                                <p
                                    style={{
                                        marginTop: 8,
                                        marginBottom: 8,
                                    }}
                                >
                                    {activity.details}
                                </p>

                                <small
                                    style={{
                                        color: "#666",
                                    }}
                                >
                                    By {activity.user?.name || "System"}
                                    <br />
                                    {new Date(
                                        activity.createdAt
                                    ).toLocaleString()}
                                </small>
                            </div>
                        ))}
                    </div>
                )}

                <div
                    style={{
                        marginTop: 20,
                        textAlign: "right",
                    }}
                >
                    <button
                        onClick={onClose}
                        style={closeButton}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

const overlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const modal = {
    width: "600px",
    maxHeight: "80vh",
    overflowY: "auto",
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const card = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px",
    background: "#f9fafb",
};

const closeBtn = {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "20px",
};

const closeButton = {
    padding: "10px 18px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
};

export default ActivityModal;