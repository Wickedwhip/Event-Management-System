import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const stats = [
    { title: "Total Events", value: 12, color: "cyan" },
    { title: "Active Tasks", value: 7, color: "magenta" },
    { title: "Completed Tasks", value: 5, color: "lime" },
    { title: "Profile Views", value: 23, color: "yellow" },
  ];

  const upcomingEvents = [
    { id: 1, title: "Quarterly Meeting", date: "2025-09-20" },
    { id: 2, title: "Client Call", date: "2025-09-22" },
  ];

  // Add fade-in effect
  useEffect(() => {
    const fadeEls = document.querySelectorAll(".fade-in");
    fadeEls.forEach((el) => el.classList.add("show"));
  }, []);

  return (
    <div className="dashboard-container">
      <h1>👨‍💻 Employee Dashboard</h1>

      {/* Stats */}
      <div className="stats-grid fade-in">
        {stats.map((s, i) => (
          <div
            key={i}
            className="glass-card"
            style={{ borderTop: `4px solid ${s.color}` }}
          >
            <h3>{s.title}</h3>
            <p className="pulse">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Events */}
      <div className="upcoming-events fade-in">
        <h2>📅 Upcoming Events</h2>
        <div className="cards-grid fade-in">
          {upcomingEvents.map((ev) => (
            <div key={ev.id} className="glass-card">
              <h4>{ev.title}</h4>
              <p>Date: {ev.date}</p>
              <div className="btn-group">
                <Link to="/employee/events">
                  <button className="neon-btn">View Events</button>
                </Link>
                <Link to="/employee/events/new">
                  <button className="neon-btn">Add Event</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
