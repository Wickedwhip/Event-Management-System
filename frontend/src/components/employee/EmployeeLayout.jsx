// src/components/employee/EmployeeLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import EmployeeSidebar from "./EmployeeSidebar.jsx";
import EmployeeHeaderBar from "./EmployeeHeaderBar.jsx";
import "./employee.css";

const EmployeeLayout = ({ onLogout }) => {
  return (
    <div className="employee-layout">
      <EmployeeSidebar />
      <div className="employee-main">
        <EmployeeHeaderBar onLogout={onLogout} />
        <main className="employee-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
