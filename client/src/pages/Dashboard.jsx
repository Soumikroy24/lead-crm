import { useEffect, useState } from "react";
import { getAllLeads } from "../services/leadService";

function Dashboard() {
    const [stats, setStats] = useState({
        total: 0,
        new: 0,
        qualified: 0,
        contacted: 0,
        closed: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const data = await getAllLeads();

            const leads = data.leads;

            setStats({
                total: leads.length,
                new: leads.filter((lead) => lead.status === "New").length,
                qualified: leads.filter((lead) => lead.status === "Qualified").length,
                contacted: leads.filter((lead) => lead.status === "Contacted").length,
                closed: leads.filter((lead) => lead.status === "Closed").length,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ padding: "30px" }}>
                <h2>Loading dashboard...</h2>
            </div>
        );
    }

    const cards = [
        {
            title: "Total Leads",
            value: stats.total,
            color: "#2563eb",
        },
        {
            title: "New Leads",
            value: stats.new,
            color: "#10b981",
        },
        {
            title: "Qualified",
            value: stats.qualified,
            color: "#f59e0b",
        },
        {
            title: "Contacted",
            value: stats.contacted,
            color: "#8b5cf6",
        },
        {
            title: "Closed",
            value: stats.closed,
            color: "#ef4444",
        },
    ];

    return (
        <div style={{ padding: "30px" }}>
            <h1 style={{ marginBottom: "30px" }}>
                Dashboard
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                }}
            >
                {cards.map((card) => (
                    <div
                        key={card.title}
                        style={{
                            background: "#ffffff",
                            borderRadius: "12px",
                            padding: "25px",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                            borderLeft: `6px solid ${card.color}`,
                        }}
                    >
                        <h3
                            style={{
                                margin: 0,
                                color: "#64748b",
                            }}
                        >
                            {card.title}
                        </h3>

                        <h1
                            style={{
                                marginTop: "15px",
                                fontSize: "42px",
                                color: "#1e293b",
                            }}
                        >
                            {card.value}
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;