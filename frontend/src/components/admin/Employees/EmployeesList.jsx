import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeesList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const res = await fetch("http://localhost:5000/api/employees");
    const data = await res.json();
    setEmployees(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    await fetch(`http://localhost:5000/api/employees/${id}`, { method: "DELETE" });
    fetchEmployees();
  };

  useEffect(() => { fetchEmployees(); }, []);

  return (
    <div className="glass-card">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <h2>Employees</h2>
        <button className="neon-btn" onClick={() => navigate("/admin/employees/form")}>+ Add</button>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {employees.map(emp => (
          <div key={emp._id} style={{ display: "flex", justifyContent: "space-between", padding: 12, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
            <div>
              <strong>{emp.name}</strong>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{emp.role}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="neon-btn" onClick={() => navigate(`/admin/employees/form/${emp._id}`)}>Edit</button>
              <button className="neon-btn" onClick={() => handleDelete(emp._id)}>Delete</button>
              <button className="neon-btn" onClick={() => alert(JSON.stringify(emp, null, 2))}>Preview</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesList;
