import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function DashboardLayout() {
    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
            }}
        >
            <Sidebar />

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Navbar />

                <main
                    style={{
                        flex: 1,
                        padding: "20px",
                    }}
                >
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
}

export default DashboardLayout;