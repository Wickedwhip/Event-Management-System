import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeHeaderBar = ({ onLogout, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/", { replace: true });
  };

  return (
    <header className="header-bar">
      <button onClick={toggleSidebar} className="sidebar-toggle">☰</button>
      <div className="header-title">👋 Welcome, Employee</div>
      <button className="logout-btn" onClick={handleLogout}>🔒 Logout</button>
    </header>
  );
};

export default EmployeeHeaderBar;
