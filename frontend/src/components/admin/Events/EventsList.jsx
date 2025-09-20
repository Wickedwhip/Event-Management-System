import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EventsList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await fetch(`http://localhost:5000/api/events/${id}`, { method: "DELETE" });
      fetchEvents(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="glass-card">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <h2>Events</h2>
        <button className="neon-btn" onClick={() => navigate("/admin/events/form")}>+ Add Event</button>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {events.map(e => (
          <div key={e._id} style={{ display: "flex", justifyContent: "space-between", padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.03)" }}>
            <div>
              <strong>{e.title}</strong>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                {new Date(e.date).toLocaleDateString()} · {e.status}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="neon-btn" onClick={() => navigate(`/admin/events/form/${e._id}`)}>Edit</button>
              <button className="neon-btn" onClick={() => handleDelete(e._id)}>Delete</button>
              <button className="neon-btn" onClick={() => alert(JSON.stringify(e, null, 2))}>Preview</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
