// src/components/employee/Tasks/TaskForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const save = (e) => {
    e.preventDefault();
    alert(`Saved task: ${title}`);
    navigate("/employee/tasks");
  };

  return (
    <div className="glass-card">
      <h2>Add Task</h2>
      <form onSubmit={save} style={{ display: "grid", gap: 10 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" required />
        <div style={{ display: "flex", gap: 8 }}>
          <button className="neon-btn" type="submit">Save</button>
          <button className="neon-btn" type="button" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
