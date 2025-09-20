import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Calendar, Users, CheckSquare, Ticket, BarChart2 } from "lucide-react";

const Sidebar = () => {
  const cls = ({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`;

  return (
    <aside className="sidebar admin-sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <nav>
        <NavLink to="/admin/dashboard" className={cls}><Home size={16}/> Dashboard</NavLink>
        <NavLink to="/admin/events" className={cls}><Calendar size={16}/> Events</NavLink>
        <NavLink to="/admin/employees" className={cls}><Users size={16}/> Employees</NavLink>
        <NavLink to="/admin/tasks" className={cls}><CheckSquare size={16}/> Tasks</NavLink>
        <NavLink to="/admin/tickets" className={cls}><Ticket size={16}/> Tickets</NavLink>
        <NavLink to="/admin/users" className={cls}><Users size={16}/> Users</NavLink>
        <NavLink to="/admin/reports" className={cls}><BarChart2 size={16}/> Reports</NavLink>
        <NavLink to="/admin/settings" className={cls}>Settings</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
