import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header
            style={{
                height: "70px",
                background: "#ffffff",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 30px",
                boxSizing: "border-box",
            }}
        >
            <div>
                <h2
                    style={{
                        margin: 0,
                        fontSize: "24px",
                        color: "#1e293b",
                    }}
                >
                    Lead Management System
                </h2>

                <p
                    style={{
                        margin: "4px 0 0",
                        color: "#64748b",
                        fontSize: "14px",
                    }}
                >
                    Manage your leads efficiently
                </p>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <div style={{ textAlign: "right" }}>
                    <strong>{user?.name || "User"}</strong>

                    <br />

                    <span
                        style={{
                            color: "#64748b",
                            fontSize: "13px",
                        }}
                    >
                        {user?.role || ""}
                    </span>
                </div>

                <button
                    onClick={handleLogout}
                    style={{
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Navbar;