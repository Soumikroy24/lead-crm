import api from "../api/axios";

// Get all leads with search, filters and pagination
export const getAllLeads = async (params = {}) => {
    const response = await api.get("/leads", {
        params,
    });

    return response.data;
};

// Get lead by ID
export const getLeadById = async (id) => {
    const response = await api.get(`/leads/${id}`);
    return response.data;
};

// Create lead
export const createLead = async (leadData) => {
    const response = await api.post("/leads", leadData);
    return response.data;
};

// Update lead
export const updateLead = async (id, leadData) => {
    const response = await api.put(`/leads/${id}`, leadData);
    return response.data;
};

// Assign lead to a member
export const assignLead = async (id, assignedTo) => {
    const response = await api.put(`/leads/${id}/assign`, {
        assignedTo,
    });

    return response.data;
};

// Delete lead
export const deleteLead = async (id) => {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
};

// Get all members (Admin only)
export const getAllMembers = async () => {
    const response = await api.get("/auth/members");
    return response.data;
};

// Get activity timeline for a lead
export const getLeadActivities = async (id) => {
    const response = await api.get(`/leads/${id}/activity`);
    return response.data;
};

// Get all notes for a lead
export const getLeadNotes = async (leadId) => {
    const response = await api.get(`/notes/${leadId}`);
    return response.data;
};

// Add a note to a lead
export const addLeadNote = async (leadId, text) => {
    const response = await api.post(`/notes/${leadId}`, {
        text,
    });

    return response.data;
};