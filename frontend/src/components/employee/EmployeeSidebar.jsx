import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Calendar, CheckSquare, User } from "lucide-react";

const EmployeeSidebar = () => {
  const cls = ({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`;

  return (
    <aside className="sidebar employee-sidebar">
      <h2 className="sidebar-title">Employee Panel</h2>
      <nav>
        <NavLink to="/employee/dashboard" className={cls}><Home size={16}/> Dashboard</NavLink>
        <NavLink to="/employee/events" className={cls}><Calendar size={16}/> Events</NavLink>
        <NavLink to="/employee/tasks" className={cls}><CheckSquare size={16}/> Tasks</NavLink>
        <NavLink to="/employee/profile" className={cls}><User size={16}/> Profile</NavLink>
      </nav>
    </aside>
  );
};

export default EmployeeSidebar;
