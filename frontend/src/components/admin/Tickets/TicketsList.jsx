import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TicketsList = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    const res = await fetch("http://localhost:5000/api/tickets");
    const data = await res.json();
    setTickets(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this ticket?")) return;
    await fetch(`http://localhost:5000/api/tickets/${id}`, { method: "DELETE" });
    fetchTickets();
  };

  useEffect(() => { fetchTickets(); }, []);

  return (
    <div className="glass-card">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <h2>Tickets</h2>
        <button className="neon-btn" onClick={() => navigate("/admin/tickets/form")}>+ Add Ticket</button>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {tickets.map(ticket => (
          <div key={ticket._id} style={{ display: "flex", justifyContent: "space-between", padding: 12, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
            <div>
              <strong>{ticket.subject}</strong>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                {ticket.assignedTo?.name || "Unassigned"} · {ticket.status} · {ticket.priority}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="neon-btn" onClick={() => navigate(`/admin/tickets/form/${ticket._id}`)}>Edit</button>
              <button className="neon-btn" onClick={() => handleDelete(ticket._id)}>Delete</button>
              <button className="neon-btn" onClick={() => alert(JSON.stringify(ticket, null, 2))}>Preview</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketsList;
