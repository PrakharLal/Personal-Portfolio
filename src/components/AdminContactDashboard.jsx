import { useState, useEffect } from "react";
import { contactAPI } from "@/api/contactAPI";
import { Mail, Phone, MapPin, Trash2, CheckCircle, Eye, Archive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AdminContactDashboard = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filterStatus, setFilterStatus] = useState("new");

  useEffect(() => {
    fetchContacts();
  }, []);

  const BACKEND_DISABLED = import.meta.env.VITE_BACKEND_DISABLED === "true";

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const result = await contactAPI.getAll();
      if (result.success) {
        setContacts(result.data);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to load contacts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await contactAPI.markAsRead(id);
      setContacts((prev) =>
        prev.map((c) => (c._id === id || c.id === id ? { ...c, isRead: true } : c))
      );
      if (selectedContact?._id === id || selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, isRead: true });
      }
      toast({
        title: "Success",
        description: "Message marked as read",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to mark as read",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await contactAPI.delete(id);
      setContacts((prev) => prev.filter((c) => c._id !== id && c.id !== id));
      if (selectedContact?._id === id || selectedContact?.id === id) {
        setSelectedContact(null);
      }
      toast({
        title: "Success",
        description: "Message deleted",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await contactAPI.updateStatus(id, status);
      setContacts((prev) =>
        prev.map((c) => (c._id === id || c.id === id ? { ...c, status } : c))
      );
      if (selectedContact?._id === id || selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, status });
      }
      toast({
        title: "Success",
        description: `Message marked as ${status}`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const filteredContacts = contacts.filter((c) =>
    filterStatus === "all" ? true : c.status === filterStatus
  );

  const stats = {
    total: contacts.length,
    unread: contacts.filter((c) => !c.isRead).length,
    new: contacts.filter((c) => c.status === "new").length,
    replied: contacts.filter((c) => c.status === "replied").length,
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Contact Messages Dashboard</h1>
          <p className="text-muted-foreground">Manage and respond to visitor messages</p>
          {BACKEND_DISABLED && (
            <p className="text-xs text-muted-foreground">Note: Backend removed — this dashboard reads messages from localStorage only.</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-lg border border-primary/20 bg-secondary/30">
            <p className="text-sm text-muted-foreground">Total Messages</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
            <p className="text-sm text-muted-foreground">Unread</p>
            <p className="text-2xl font-bold text-red-500">{stats.unread}</p>
          </div>
          <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
            <p className="text-sm text-muted-foreground">New</p>
            <p className="text-2xl font-bold text-blue-500">{stats.new}</p>
          </div>
          <div className="p-4 rounded-lg border border-green-500/20 bg-green-500/5">
            <p className="text-sm text-muted-foreground">Replied</p>
            <p className="text-2xl font-bold text-green-500">{stats.replied}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-primary/20 bg-secondary/30 overflow-hidden">
              {/* Filter */}
              <div className="p-4 border-b border-primary/20">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-background border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Messages</option>
                  <option value="new">New</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* List */}
              <div className="max-h-[600px] overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center text-muted-foreground">
                    Loading messages...
                  </div>
                ) : error ? (
                  <div className="p-4 text-center text-red-500">{error}</div>
                ) : filteredContacts.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No messages found
                  </div>
                ) : (
                  filteredContacts.map((contact) => {
                    const contactId = contact._id || contact.id;
                    return (
                    <div
                      key={contactId}
                      onClick={() => setSelectedContact(contact)}
                      className={`p-4 border-b border-primary/10 cursor-pointer hover:bg-primary/5 transition ${
                        (selectedContact?._id === contact._id || selectedContact?.id === contactId)
                          ? "bg-primary/10"
                          : ""
                      } ${!contact.isRead ? "bg-blue-500/5" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{contact.name}</p>
                          <p className="text-sm text-muted-foreground truncate">
                            {contact.email}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {contact.message.substring(0, 50)}...
                          </p>
                        </div>
                        {!contact.isRead && (
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                      <div className="mt-2 flex gap-1 flex-wrap">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            contact.status === "new"
                              ? "bg-blue-500/20 text-blue-600"
                              : contact.status === "replied"
                              ? "bg-green-500/20 text-green-600"
                              : "bg-gray-500/20 text-gray-600"
                          }`}
                        >
                          {contact.status}
                        </span>
                      </div>
                      </div>
                      );
                    })
                )}
              </div>
            </div>
          </div>

          {/* Message Details */}
          <div className="lg:col-span-2">
            {selectedContact ? (
              <div className="rounded-lg border border-primary/20 bg-secondary/30 p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">{selectedContact.name}</h2>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-primary" />
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="text-primary hover:underline"
                      >
                        {selectedContact.email}
                      </a>
                    </div>
                    {selectedContact.subject && (
                      <div className="pt-2 border-t border-primary/20">
                        <p className="text-sm text-muted-foreground">Subject</p>
                        <p className="text-lg font-semibold">{selectedContact.subject}</p>
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div className="mb-6 p-4 rounded bg-background/50 border border-primary/20 max-h-96 overflow-y-auto">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {selectedContact.message}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-4 p-4 rounded bg-background/50 border border-primary/20 text-sm">
                    <div>
                      <p className="text-muted-foreground">Received</p>
                      <p>{new Date(selectedContact.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="capitalize">{selectedContact.status}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  {!selectedContact.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(selectedContact._id || selectedContact.id)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                    >
                      <Eye size={18} />
                      Mark as Read
                    </button>
                  )}

                  {selectedContact.status !== "replied" && (
                    <button
                      onClick={() => handleUpdateStatus(selectedContact._id || selectedContact.id, "replied")}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition"
                    >
                      <CheckCircle size={18} />
                      Mark as Replied
                    </button>
                  )}

                  {selectedContact.status !== "archived" && (
                    <button
                      onClick={() => handleUpdateStatus(selectedContact._id || selectedContact.id, "archived")}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition"
                    >
                      <Archive size={18} />
                      Archive
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(selectedContact._id || selectedContact.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                  >
                    <Trash2 size={18} />
                    Delete Message
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-primary/20 bg-secondary/30 p-8 h-full flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  Select a message to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
