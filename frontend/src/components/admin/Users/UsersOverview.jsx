import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersOverview = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div className="glass-card">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <h2>Users</h2>
        <button className="neon-btn" onClick={() => navigate("/admin/users/form")}>+ Add User</button>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {users.map(user => (
          <div key={user._id} style={{ display: "flex", justifyContent: "space-between", padding: 12, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
            <div>
              <strong>{user.username}</strong>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{user.role}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="neon-btn" onClick={() => navigate(`/admin/users/form/${user._id}`)}>Edit</button>
              <button className="neon-btn" onClick={() => handleDelete(user._id)}>Delete</button>
              <button className="neon-btn" onClick={() => alert(JSON.stringify(user, null, 2))}>Preview</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersOverview;
