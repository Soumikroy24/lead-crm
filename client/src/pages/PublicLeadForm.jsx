import { useState } from "react";
import api from "../api/axios";

function PublicLeadForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        source: "Website",
        notes: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await api.post("/leads/public", form);

            alert("Lead submitted successfully.");

            setForm({
                name: "",
                email: "",
                phone: "",
                company: "",
                source: "Website",
                notes: "",
            });

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to submit lead."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: 600,
                margin: "40px auto",
                background: "#fff",
                padding: 30,
                borderRadius: 10,
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
        >
            <h1>Contact Us</h1>

            <p>
                Fill out the form below and our team will contact you.
            </p>

            <form onSubmit={handleSubmit}>

                <input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={input}
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={input}
                />

                <input
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    style={input}
                />

                <input
                    name="company"
                    placeholder="Company"
                    value={form.company}
                    onChange={handleChange}
                    style={input}
                />

                <select
                    name="source"
                    value={form.source}
                    onChange={handleChange}
                    style={input}
                >
                    <option>Website</option>
                    <option>LinkedIn</option>
                    <option>Referral</option>
                    <option>Facebook</option>
                    <option>Instagram</option>
                    <option>Email</option>
                    <option>Cold Call</option>
                    <option>Other</option>
                </select>

                <textarea
                    name="notes"
                    placeholder="Message"
                    value={form.notes}
                    onChange={handleChange}
                    rows={5}
                    style={input}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={button}
                >
                    {loading ? "Submitting..." : "Submit Lead"}
                </button>

            </form>
        </div>
    );
}

const input = {
    width: "100%",
    padding: "10px",
    marginTop: "15px",
    boxSizing: "border-box",
};

const button = {
    width: "100%",
    marginTop: "20px",
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
};

export default PublicLeadForm;