import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderBar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/", { replace: true });
  };

  return (
    <header className="header-bar">
      <div className="header-title">👋 Welcome to <strong>TriVerse Hub</strong></div>
      <button className="logout-btn" onClick={handleLogout}>🔒 Logout</button>
    </header>
  );
};

export default HeaderBar;
