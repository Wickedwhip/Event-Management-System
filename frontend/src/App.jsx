// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Admin
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminDashboard from "./components/admin/Dashboard.jsx";
import EmployeesList from "./components/admin/Employees/EmployeesList.jsx";
import EmployeeForm from "./components/admin/Employees/EmployeeForm.jsx";
import EventsList from "./components/admin/Events/EventsList.jsx";
import EventForm from "./components/admin/Events/EventForm.jsx";
import TaskList from "./components/admin/Tasks/TaskList.jsx";
import TaskForm from "./components/admin/Tasks/TaskForm.jsx";
import TicketsList from "./components/admin/Tickets/TicketsList.jsx";
import TicketForm from "./components/admin/Tickets/TicketForm.jsx";
import UsersOverview from "./components/admin/Users/UsersOverview.jsx";
import UsersForm from "./components/admin/Users/UsersForm.jsx";
import ReportsPage from "./components/admin/Reports/ReportsPage.jsx";
import SettingsPage from "./components/admin/Settings/SettingsPage.jsx";

// Employee
import EmployeeLayout from "./components/employee/EmployeeLayout.jsx";
import EmployeeDashboard from "./components/employee/EmployeeDashboard.jsx";
import EmployeeTaskList from "./components/employee/Tasks/TaskList.jsx";
import EmployeeTaskForm from "./components/employee/Tasks/TaskForm.jsx";
import EmployeeEventList from "./components/employee/Events/EventList.jsx";
import EmployeeEventForm from "./components/employee/Events/EventForm.jsx";
import ProfilePage from "./components/employee/Profile/ProfilePage.jsx";

// Login
import LoginPage from "./components/admin/LoginPage.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // "admin" | "employee" | null

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <Router>
      <Routes>
        {/* Public / Login */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to={`/${role}/dashboard`} replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />

        {/* Admin routes */}
        {isLoggedIn && role === "admin" && (
          <Route path="/admin" element={<AdminLayout onLogout={handleLogout} />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />

            {/* Employees */}
            <Route path="employees" element={<EmployeesList />} />
            <Route path="employees/form" element={<EmployeeForm />} />
            <Route path="employees/form/:id" element={<EmployeeForm />} />

            {/* Events */}
            <Route path="events" element={<EventsList />} />
            <Route path="events/form" element={<EventForm />} />
            <Route path="events/form/:id" element={<EventForm />} />

            {/* Tasks */}
            <Route path="tasks" element={<TaskList />} />
            <Route path="tasks/form" element={<TaskForm />} />
            <Route path="tasks/form/:id" element={<TaskForm />} />

            {/* Tickets */}
            <Route path="tickets" element={<TicketsList />} />
            <Route path="tickets/form" element={<TicketForm />} />
            <Route path="tickets/form/:id" element={<TicketForm />} />

            {/* Users */}
            <Route path="users" element={<UsersOverview />} />
            <Route path="users/form" element={<UsersForm />} />
            <Route path="users/form/:id" element={<UsersForm />} />

            {/* Other Pages */}
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />

            {/* Fallback inside admin */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>
        )}

        {/* Employee routes */}
        {isLoggedIn && role === "employee" && (
          <Route
            path="/employee"
            element={<EmployeeLayout onLogout={handleLogout} />}
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<EmployeeDashboard />} />

            {/* Tasks */}
            <Route path="tasks" element={<EmployeeTaskList />} />
            <Route path="tasks/form" element={<EmployeeTaskForm />} />
            <Route path="tasks/form/:id" element={<EmployeeTaskForm />} />

            {/* Events */}
            <Route path="events" element={<EmployeeEventList />} />
            <Route path="events/form" element={<EmployeeEventForm />} />
            <Route path="events/form/:id" element={<EmployeeEventForm />} />

            {/* Profile */}
            <Route path="profile" element={<ProfilePage />} />

            {/* Fallback inside employee */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>
        )}

        {/* Global Fallback */}
        <Route
          path="*"
          element={
            <Navigate
              to={isLoggedIn ? `/${role}/dashboard` : "/"}
              replace
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
