import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UsersForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/users/${id}`)
        .then(res => res.json())
        .then(data => {
          setUsername(data.username);
          setRole(data.role);
        });
    }
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { username, password, role };

    if (id) {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    navigate("/admin/users");
  };

  return (
    <div className="glass-card">
      <h2>{id ? "Edit User" : "Create User"}</h2>
      <form onSubmit={handleSave} style={{ display: "grid", gap: 10 }}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={id ? "New Password (optional)" : "Password"} {...(!id && { required: true })} />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="neon-btn" type="submit">Save</button>
          <button className="neon-btn" type="button" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UsersForm;
