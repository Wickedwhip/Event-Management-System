import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/employees/${id}`)
        .then(res => res.json())
        .then(data => {
          setName(data.name);
          setRole(data.role);
          setEmail(data.email || "");
          setPhone(data.phone || "");
        });
    }
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { name, role, email, phone };

    if (id) {
      await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    navigate("/admin/employees");
  };

  return (
    <div className="glass-card">
      <h2>{id ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSave} style={{ display: "grid", gap: 10 }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={role} onChange={e => setRole(e.target.value)} placeholder="Role" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
        <div style={{ display: "flex", gap: 8 }}>
          <button className="neon-btn" type="submit">Save</button>
          <button className="neon-btn" type="button" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
