import { useEffect, useState } from "react";
import {
    getAllLeads,
    deleteLead,
    getAllMembers,
    assignLead,
} from "../services/leadService";
import AddLeadModal from "../components/AddLeadModal";
import ActivityModal from "../components/ActivityModal";
import NotesModal from "../components/NotesModal";

function Leads() {
    const [leads, setLeads] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [openModal, setOpenModal] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);

    // Activity Modal
    const [openActivityModal, setOpenActivityModal] = useState(false);
    const [selectedLeadId, setSelectedLeadId] = useState(null);

    // Notes Modal
    const [openNotesModal, setOpenNotesModal] = useState(false);
    const [selectedNotesLeadId, setSelectedNotesLeadId] = useState(null);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [source, setSource] = useState("All");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchLeads();

        if (user?.role === "admin") {
            fetchMembers();
        }
    }, [search, status, source, page]);

    const fetchLeads = async () => {
        try {
            setLoading(true);

            const data = await getAllLeads({
                search,
                status,
                source,
                page,
                limit: 5,
            });

            setLeads(data.leads);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error);
            alert("Failed to fetch leads.");
        } finally {
            setLoading(false);
        }
    };

    const fetchMembers = async () => {
        try {
            const data = await getAllMembers();
            setMembers(data.members);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAssign = async (leadId, memberId) => {
        try {
            await assignLead(leadId, memberId);
            fetchLeads();
        } catch (error) {
            console.error(error);
            alert("Failed to assign lead.");
        }
    };

    const handleAddLead = () => {
        setSelectedLead(null);
        setOpenModal(true);
    };

    const handleEdit = (lead) => {
        setSelectedLead(lead);
        setOpenModal(true);
    };

    const handleActivity = (leadId) => {
        setSelectedLeadId(leadId);
        setOpenActivityModal(true);
    };

    const handleNotes = (leadId) => {
        setSelectedNotesLeadId(leadId);
        setOpenNotesModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this lead?")) return;

        try {
            await deleteLead(id);
            fetchLeads();
        } catch {
            alert("Failed to delete lead.");
        }
    };

    return (
        <div style={{ padding: 30 }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 20,
                }}
            >
                <h1>Lead Management</h1>

                <button
                    onClick={handleAddLead}
                    style={btn}
                >
                    + Add Lead
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    gap: 15,
                    marginBottom: 20,
                }}
            >
                <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                        setPage(1);
                        setSearch(e.target.value);
                    }}
                    style={input}
                />

                <select
                    value={status}
                    onChange={(e) => {
                        setPage(1);
                        setStatus(e.target.value);
                    }}
                    style={input}
                >
                    <option>All</option>
                    <option>New</option>
                    <option>Qualified</option>
                    <option>Contacted</option>
                    <option>Closed</option>
                </select>

                <select
                    value={source}
                    onChange={(e) => {
                        setPage(1);
                        setSource(e.target.value);
                    }}
                    style={input}
                >
                    <option>All</option>
                    <option>LinkedIn</option>
                    <option>Website</option>
                    <option>Facebook</option>
                    <option>Referral</option>
                </select>
            </div>

            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            background: "#fff",
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={th}>Name</th>
                                <th style={th}>Company</th>
                                <th style={th}>Status</th>
                                <th style={th}>Source</th>
                                <th style={th}>Assigned To</th>
                                <th style={th}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {leads.map((lead) => (
                                <tr key={lead._id}>
                                    <td style={td}>{lead.name}</td>
                                    <td style={td}>{lead.company || "-"}</td>
                                    <td style={td}>{lead.status}</td>
                                    <td style={td}>{lead.source}</td>

                                    <td style={td}>
                                        {lead.assignedTo?.name || "Unassigned"}

                                        {user?.role === "admin" && (
                                            <>
                                                <br />

                                                <select
                                                    value={lead.assignedTo?._id || ""}
                                                    onChange={(e) =>
                                                        handleAssign(
                                                            lead._id,
                                                            e.target.value
                                                        )
                                                    }
                                                    style={{
                                                        marginTop: 8,
                                                        padding: 6,
                                                        borderRadius: 5,
                                                    }}
                                                >
                                                    <option value="">
                                                        Select Member
                                                    </option>

                                                    {members.map((member) => (
                                                        <option
                                                            key={member._id}
                                                            value={member._id}
                                                        >
                                                            {member.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </>
                                        )}
                                    </td>

                                    <td style={td}>
                                        <button
                                            onClick={() =>
                                                handleNotes(lead._id)
                                            }
                                            style={notesBtn}
                                        >
                                            Notes
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleActivity(lead._id)
                                            }
                                            style={activityBtn}
                                        >
                                            Activity
                                        </button>

                                        <button
                                            onClick={() => handleEdit(lead)}
                                            style={editBtn}
                                        >
                                            Edit
                                        </button>

                                        {user?.role === "admin" && (
                                            <button
                                                onClick={() =>
                                                    handleDelete(lead._id)
                                                }
                                                style={deleteBtn}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 10,
                            marginTop: 25,
                        }}
                    >
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>

                        <span>
                            Page {page} of {totalPages}
                        </span>

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
            <AddLeadModal
                open={openModal}
                onClose={() => {
                    setOpenModal(false);
                    setSelectedLead(null);
                }}
                onLeadCreated={fetchLeads}
                editLead={selectedLead}
            />

            <ActivityModal
                open={openActivityModal}
                onClose={() => {
                    setOpenActivityModal(false);
                    setSelectedLeadId(null);
                }}
                leadId={selectedLeadId}
            />

            <NotesModal
                open={openNotesModal}
                onClose={() => {
                    setOpenNotesModal(false);
                    setSelectedNotesLeadId(null);
                }}
                leadId={selectedNotesLeadId}
            />
        </div>
    );
}

const input = {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
};

const btn = {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 8,
    cursor: "pointer",
};

const th = {
    textAlign: "left",
    padding: 12,
    borderBottom: "1px solid #ddd",
};

const td = {
    padding: 12,
    borderBottom: "1px solid #eee",
};
const notesBtn = {
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
    fontWeight: "500",
};

const activityBtn = {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
    fontWeight: "500",
};

const editBtn = {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
    fontWeight: "500",
};

const deleteBtn = {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
};

export default Leads;