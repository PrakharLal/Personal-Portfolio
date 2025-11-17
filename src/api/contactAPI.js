const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BACKEND_DISABLED = import.meta.env.VITE_BACKEND_DISABLED === "true";
const LOCAL_STORAGE_KEY = "portfolio.contacts";

export const contactAPI = {
  // Submit new contact message
  submit: async (data) => {
    if (BACKEND_DISABLED) {
      try {
        const payload = {
          id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          name: data.name || "",
          email: data.email || "",
          message: data.message || "",
          subject: data.subject || "",
          isRead: false,
          status: "new",
          createdAt: new Date().toISOString(),
        };

        const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
        existing.unshift(payload);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

        return {
          success: true,
          message: "Message saved locally (backend disabled).",
          data: { id: payload.id, email: payload.email },
        };
      } catch (err) {
        console.error("LocalStorage contact error:", err);
        throw new Error("Failed to save message locally");
      }
    }
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit contact form");
      }

      return await response.json();
    } catch (error) {
      console.error("Contact API error:", error);
      throw error;
    }
  },

  // Get all contacts (admin)
  getAll: async () => {
    if (BACKEND_DISABLED) {
      try {
        const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
        return { success: true, count: stored.length, data: stored };
      } catch (err) {
        console.error("Contact localStorage read error:", err);
        throw err;
      }
    }
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`);

      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }

      return await response.json();
    } catch (error) {
      console.error("Contact API error:", error);
      throw error;
    }
  },

  // Get contact by ID
  getById: async (id) => {
    if (BACKEND_DISABLED) {
      try {
        const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
        const found = stored.find((c) => c.id === id);
        if (!found) throw new Error("Not found");
        return { success: true, data: found };
      } catch (err) {
        console.error("Contact localStorage read error:", err);
        throw err;
      }
    }
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch contact");
      }

      return await response.json();
    } catch (error) {
      console.error("Contact API error:", error);
      throw error;
    }
  },

  // Mark as read
  markAsRead: async (id) => {
    if (BACKEND_DISABLED) {
      try {
        const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
        const updated = stored.map((c) => (c.id === id ? { ...c, isRead: true } : c));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        return { success: true, data: updated.find((c) => c.id === id) };
      } catch (err) {
        console.error("LocalStorage update error:", err);
        throw err;
      }
    }
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}/read`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update contact");
      }

      return await response.json();
    } catch (error) {
      console.error("Contact API error:", error);
      throw error;
    }
  },

  // Update status
  updateStatus: async (id, status) => {
    if (BACKEND_DISABLED) {
      try {
        const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
        const updated = stored.map((c) => (c.id === id ? { ...c, status } : c));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        return { success: true, data: updated.find((c) => c.id === id) };
      } catch (err) {
        console.error("LocalStorage update error:", err);
        throw err;
      }
    }
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update contact status");
      }

      return await response.json();
    } catch (error) {
      console.error("Contact API error:", error);
      throw error;
    }
  },

  // Delete contact
  delete: async (id) => {
    if (BACKEND_DISABLED) {
      try {
        const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
        const updated = stored.filter((c) => c.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        return { success: true, message: "Message deleted" };
      } catch (err) {
        console.error("LocalStorage delete error:", err);
        throw err;
      }
    }
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }

      return await response.json();
    } catch (error) {
      console.error("Contact API error:", error);
      throw error;
    }
  },
};
