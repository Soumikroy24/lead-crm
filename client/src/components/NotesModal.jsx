import { useEffect, useState } from "react";
import {
    getLeadNotes,
    addLeadNote,
} from "../services/leadService";

function NotesModal({
    open,
    onClose,
    leadId,
}) {
    const [notes, setNotes] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && leadId) {
            fetchNotes();
        }
    }, [open, leadId]);

    const fetchNotes = async () => {
        try {
            setLoading(true);

            const data = await getLeadNotes(leadId);

            setNotes(data.notes);
        } catch (error) {
            console.error(error);
            alert("Failed to load notes.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddNote = async () => {
        if (!text.trim()) {
            return alert("Please enter a note.");
        }

        try {
            await addLeadNote(leadId, text);

            setText("");

            fetchNotes();
        } catch (error) {
            console.error(error);
            alert("Failed to add note.");
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
                    <h2>Lead Notes</h2>

                    <button
                        onClick={onClose}
                        style={closeBtn}
                    >
                        ✕
                    </button>
                </div>

                <textarea
                    placeholder="Write a note..."
                    value={text}
                    onChange={(e) =>
                        setText(e.target.value)
                    }
                    rows={4}
                    style={textarea}
                />

                <button
                    onClick={handleAddNote}
                    style={addBtn}
                >
                    Add Note
                </button>

                <hr
                    style={{
                        margin: "20px 0",
                    }}
                />

                {loading ? (
                    <h3>Loading...</h3>
                ) : notes.length === 0 ? (
                    <p>No notes found.</p>
                ) : (
                    <div>
                        {notes.map((note) => (
                            <div
                                key={note._id}
                                style={card}
                            >
                                <p
                                    style={{
                                        marginBottom: 10,
                                    }}
                                >
                                    {note.text}
                                </p>

                                <small
                                    style={{
                                        color: "#666",
                                    }}
                                >
                                    <strong>
                                        {note.user?.name}
                                    </strong>
                                    <br />
                                    {new Date(
                                        note.createdAt
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
    width: "650px",
    maxHeight: "80vh",
    overflowY: "auto",
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const textarea = {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "vertical",
};

const addBtn = {
    marginTop: "10px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
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

export default NotesModal;
