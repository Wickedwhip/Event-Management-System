import React, { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (!res.ok) return setError(data.msg || "Login failed");

      onLogin(data.role);
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="glass-card">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button className="neon-btn" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
