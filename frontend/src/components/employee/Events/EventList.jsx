// src/components/employee/Events/EventList.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const navigate = useNavigate();
  const events = [
    { id: 1, title: "Team Meeting", date: "2025-09-20" },
    { id: 2, title: "Client Presentation", date: "2025-09-25" },
  ];

  return (
    <div className="glass-card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Events</h2>
        <button
          className="neon-btn"
          onClick={() => navigate("/employee/events/form")}
        >
          + Add Event
        </button>
      </div>

      <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
        {events.map((e) => (
          <div
            key={e.id}
            style={{
              padding: 12,
              borderRadius: 8,
              background: "rgba(255,255,255,0.03)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <strong>{e.title}</strong>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                {e.date}
              </div>
            </div>
            <div>
              <button
                className="neon-btn"
                onClick={() => navigate("/employee/events/form")}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
