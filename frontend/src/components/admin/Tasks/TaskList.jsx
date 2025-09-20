import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="glass-card">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <h2>Tasks</h2>
        <button className="neon-btn" onClick={() => navigate("/admin/tasks/form")}>+ Add Task</button>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {tasks.map(task => (
          <div key={task._id} style={{ display: "flex", justifyContent: "space-between", padding: 12, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
            <div>
              <strong>{task.title}</strong>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                {task.assignedTo?.name || "Unassigned"} · {task.status}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="neon-btn" onClick={() => navigate(`/admin/tasks/form/${task._id}`)}>Edit</button>
              <button className="neon-btn" onClick={() => handleDelete(task._id)}>Delete</button>
              <button className="neon-btn" onClick={() => alert(JSON.stringify(task, null, 2))}>Preview</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
