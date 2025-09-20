import React, { useState } from "react";

const ReportsPage = () => {
  const [filters, setFilters] = useState({ type: "", from: "", to: "" });
  const [records, setRecords] = useState([]);

  const handleFilter = () => {
    // ready for backend API call
  };

  const handleExportPDF = () => {
    // ready for PDF export integration
  };

  return (
    <div className="glass-card" style={{ padding: 20 }}>
      <h2 style={{ color: "#00f5ff" }}>Reports</h2>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <input className="neon-input" placeholder="Type" value={filters.type} onChange={e => setFilters({...filters, type: e.target.value})} />
        <input className="neon-input" type="date" value={filters.from} onChange={e => setFilters({...filters, from: e.target.value})} />
        <input className="neon-input" type="date" value={filters.to} onChange={e => setFilters({...filters, to: e.target.value})} />
        <button className="neon-btn" onClick={handleFilter}>Filter</button>
        <button className="neon-btn" onClick={handleExportPDF}>Export PDF</button>
      </div>

      {records.length === 0 ? (
        <p style={{ color: "#fff" }}>No records found</p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {records.map((r, i) => (
            <div key={i} className="record-card" style={{ padding: 16, borderRadius: 10, background: "rgba(255,255,255,0.03)" }}>
              <div style={{ fontSize: 13, color: "#00f5ff" }}>{r.title}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                {r.details}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
