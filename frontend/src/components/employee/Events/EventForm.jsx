// src/components/employee/Events/EventForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const save = (e) => {
    e.preventDefault();
    alert(`Saved event: ${title}`);
    navigate("/employee/events");
  };

  return (
    <div className="glass-card">
      <h2>Add Event</h2>
      <form onSubmit={save} style={{ display: "grid", gap: 10 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Event title" required />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <div style={{ display: "flex", gap: 8 }}>
          <button className="neon-btn" type="submit">Save</button>
          <button className="neon-btn" type="button" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
