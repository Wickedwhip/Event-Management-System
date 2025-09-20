import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EventForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Draft");

  useEffect(() => {
    if (id) {
      // Fetch existing event for edit
      fetch(`http://localhost:5000/api/events/${id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setDate(data.date.split("T")[0]);
          setLocation(data.location || "");
          setDescription(data.description || "");
          setStatus(data.status);
        });
    }
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { title, date, location, description, status };

    try {
      if (id) {
        // Edit
        await fetch(`http://localhost:5000/api/events/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        // Add
        await fetch("http://localhost:5000/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }
      navigate("/admin/events");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="glass-card">
      <h2>{id ? "Edit Event" : "Create Event"}</h2>
      <form onSubmit={handleSave} style={{ display: "grid", gap: 10 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option>Draft</option>
          <option>Published</option>
          <option>Coming Soon</option>
        </select>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="neon-btn" type="submit">Save</button>
          <button className="neon-btn" type="button" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
