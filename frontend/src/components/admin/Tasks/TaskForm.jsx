import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/employees")
      .then(res => res.json())
      .then(setEmployees);

    if (id) {
      fetch(`http://localhost:5000/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setDescription(data.description || "");
          setAssignedTo(data.assignedTo?._id || "");
          setStatus(data.status);
          setDueDate(data.dueDate?.split("T")[0] || "");
        });
    }
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { title, description, assignedTo, status, dueDate };

    if (id) {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    navigate("/admin/tasks");
  };

  return (
    <div className="glass-card">
      <h2>{id ? "Edit Task" : "Create Task"}</h2>
      <form onSubmit={handleSave} style={{ display: "grid", gap: 10 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <select value={assignedTo} onChange={e => setAssignedTo(e.target.value)}>
          <option value="">Unassigned</option>
          {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name}</option>)}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        <div style={{ display: "flex", gap: 8 }}>
          <button className="neon-btn" type="submit">Save</button>
          <button className="neon-btn" type="button" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
