// src/components/admin/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import HeaderBar from "./HeaderBar.jsx";
import "../../styles/main.css";

const AdminLayout = ({ onLogout }) => {
  return (
    <div className="layout admin-layout">
      <Sidebar />
      <div className="main-column">
        <HeaderBar onLogout={onLogout} />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
