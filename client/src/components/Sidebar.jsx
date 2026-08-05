import { NavLink } from "react-router-dom";

function Sidebar() {
    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
        },
        {
            name: "Leads",
            path: "/leads",
        },
        {
            name: "Profile",
            path: "/profile",
        },
    ];

    return (
        <aside
            style={{
                width: "250px",
                background: "#1e293b",
                color: "#fff",
                minHeight: "100vh",
                padding: "24px 18px",
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    marginBottom: "40px",
                }}
            >
                <h1
                    style={{
                        fontSize: "28px",
                        fontWeight: "700",
                        marginBottom: "8px",
                        lineHeight: "1.1",
                    }}
                >
                    Lead CRM
                </h1>

                <p
                    style={{
                        fontSize: "11px",
                        color: "#94a3b8",
                        margin: 0,
                        lineHeight: "1.4",
                        fontWeight: "400",
                    }}
                >
                    Developed by
                    <br />
                    Soumik Roy
                </p>
            </div>

            <nav>
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: "block",
                            padding: "14px 16px",
                            marginBottom: "12px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            color: "#fff",
                            background: isActive
                                ? "#2563eb"
                                : "transparent",
                            transition: "0.3s",
                            fontWeight: 500,
                        })}
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;