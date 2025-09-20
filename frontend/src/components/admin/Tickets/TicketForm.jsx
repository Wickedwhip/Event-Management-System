import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TicketForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/employees")
      .then(res => res.json())
      .then(setEmployees);

    if (id) {
      fetch(`http://localhost:5000/api/tickets/${id}`)
        .then(res => res.json())
        .then(data => {
          setSubject(data.subject);
          setDescription(data.description || "");
          setStatus(data.status);
          setPriority(data.priority);
          setAssignedTo(data.assignedTo?._id || "");
        });
    }
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { subject, description, status, priority, assignedTo };

    if (id) {
      await fetch(`http://localhost:5000/api/tickets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch("http://localhost:5000/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    navigate("/admin/tickets");
  };

  return (
    <div className="glass-card">
      <h2>{id ? "Edit Ticket" : "Create Ticket"}</h2>
      <form onSubmit={handleSave} style={{ display: "grid", gap: 10 }}>
        <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option>Open</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select value={assignedTo} onChange={e => setAssignedTo(e.target.value)}>
          <option value="">Unassigned</option>
          {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name}</option>)}
        </select>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="neon-btn" type="submit">Save</button>
          <button className="neon-btn" type="button" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
