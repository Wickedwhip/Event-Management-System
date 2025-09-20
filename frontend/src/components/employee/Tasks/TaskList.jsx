// src/components/employee/Tasks/TaskList.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const navigate = useNavigate();
  const tasks = [
    { id: 1, title: "Prepare Slides", status: "Pending" },
    { id: 2, title: "Finalize Agenda", status: "In Progress" },
  ];

  return (
    <div className="glass-card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Tasks</h2>
        <button className="neon-btn" onClick={() => navigate("/employee/tasks/form")}>+ Add Task</button>
      </div>

      <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
        {tasks.map(t => (
          <div key={t.id} style={{ padding: 12, borderRadius: 8, background: "rgba(255,255,255,0.03)", display:"flex", justifyContent:"space-between" }}>
            <div><strong>{t.title}</strong><div style={{ fontSize:13, color:"rgba(255,255,255,0.7)" }}>{t.status}</div></div>
            <div><button className="neon-btn" onClick={() => navigate("/employee/tasks/form")}>Edit</button></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
