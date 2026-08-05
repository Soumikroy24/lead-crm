import { useEffect, useState } from "react";
import { createLead, updateLead } from "../services/leadService";

function AddLeadModal({
    open,
    onClose,
    onLeadCreated,
    editLead = null,
}) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "New",
        source: "LinkedIn",
        notes: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editLead) {
            setForm({
                name: editLead.name || "",
                email: editLead.email || "",
                phone: editLead.phone || "",
                company: editLead.company || "",
                status: editLead.status || "New",
                source: editLead.source || "LinkedIn",
                notes: editLead.notes || "",
            });
        } else {
            setForm({
                name: "",
                email: "",
                phone: "",
                company: "",
                status: "New",
                source: "LinkedIn",
                notes: "",
            });
        }
    }, [editLead, open]);

    if (!open) return null;

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

            if (editLead) {
                await updateLead(editLead._id, form);
            } else {
                await createLead(form);
            }

            onLeadCreated();
            onClose();
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Operation failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999,
            }}
        >
            <div
                style={{
                    width: 500,
                    background: "#fff",
                    borderRadius: 10,
                    padding: 25,
                }}
            >
                <h2>
                    {editLead ? "Edit Lead" : "Add New Lead"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        style={input}
                    />

                    <input
                        name="email"
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
                        required
                        style={input}
                    />

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        style={input}
                    >
                        <option>New</option>
                        <option>Qualified</option>
                        <option>Contacted</option>
                        <option>Closed</option>
                    </select>

                    <select
                        name="source"
                        value={form.source}
                        onChange={handleChange}
                        style={input}
                    >
                        <option>LinkedIn</option>
                        <option>Website</option>
                        <option>Facebook</option>
                        <option>Referral</option>
                    </select>

                    <textarea
                        name="notes"
                        placeholder="Notes"
                        value={form.notes}
                        onChange={handleChange}
                        rows={4}
                        style={input}
                    />

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 10,
                            marginTop: 20,
                        }}
                    >
                        <button
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button type="submit">
                            {loading
                                ? editLead
                                    ? "Updating..."
                                    : "Creating..."
                                : editLead
                                ? "Update Lead"
                                : "Create Lead"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const input = {
    width: "100%",
    padding: 10,
    marginTop: 12,
    boxSizing: "border-box",
};

export default AddLeadModal;