import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>🚀 Welcome back, Admin</h1>
        <p>{new Date().toLocaleDateString()} | {new Date().toLocaleTimeString()}</p>
      </header>

      {/* Stat Cards */}
      <section className="stats-grid">
        <div className="stat-card events">
          <h2>📅 Events</h2>
          <p className="stat-number">12</p>
          <span className="stat-label">Upcoming</span>
        </div>

        <div className="stat-card employees">
          <h2>👥 Employees</h2>
          <p className="stat-number">24</p>
          <span className="stat-label">Active</span>
        </div>

        <div className="stat-card tickets">
          <h2>🎟 Tickets</h2>
          <p className="stat-number">156</p>
          <span className="stat-label">Sold</span>
        </div>

        <div className="stat-card tasks">
          <h2>✅ Tasks</h2>
          <p className="stat-number">7</p>
          <span className="stat-label">Pending</span>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="recent-activity">
        <h2>📌 Recent Activity</h2>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Details</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Event</td>
              <td>New event "Tech Expo" created</td>
              <td>10 Sept 2025</td>
            </tr>
            <tr>
              <td>Ticket</td>
              <td>50 tickets sold for "Music Fest"</td>
              <td>09 Sept 2025</td>
            </tr>
            <tr>
              <td>Task</td>
              <td>“Prepare reports” marked as done</td>
              <td>08 Sept 2025</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Chart Placeholder */}
      <section className="analytics">
        <h2>📊 Analytics Overview</h2>
        <div className="chart-placeholder">
          <p>Chart will go here (hook up later with Chart.js/Recharts)</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
