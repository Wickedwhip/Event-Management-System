import React, { useState } from "react";

const dummyConfigs = {
  branding: "CyberEvent",
  accentColor: "#00F5FF",
  countdownTimer: "24h",
};

const dummyRoles = [
  { role: "Admin", canEdit: true, canDelete: true, canAssign: true },
  { role: "Employee", canEdit: false, canDelete: false, canAssign: true },
  { role: "User", canEdit: false, canDelete: false, canAssign: false },
];

const SettingsPage = () => {
  const [configs, setConfigs] = useState(dummyConfigs);
  const [roles, setRoles] = useState(dummyRoles);

  const handleConfigChange = (e) => {
    setConfigs({ ...configs, [e.target.name]: e.target.value });
  };

  const handleRoleToggle = (roleIndex, permission) => {
    setRoles((prev) =>
      prev.map((r, i) =>
        i === roleIndex ? { ...r, [permission]: !r[roleIndex][permission] } : r
      )
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">System Settings</h2>

      <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 backdrop-blur-md">
        <h3 className="text-xl font-semibold text-cyan-400 mb-4">System Configurations</h3>
        <div className="space-y-3">
          <input
            type="text"
            name="branding"
            value={configs.branding}
            onChange={handleConfigChange}
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Branding Name"
          />
          <input
            type="color"
            name="accentColor"
            value={configs.accentColor}
            onChange={handleConfigChange}
            className="w-full h-12 rounded-lg cursor-pointer"
          />
          <input
            type="text"
            name="countdownTimer"
            value={configs.countdownTimer}
            onChange={handleConfigChange}
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Countdown Timer"
          />
        </div>
      </div>

      <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 backdrop-blur-md">
        <h3 className="text-xl font-semibold text-cyan-400 mb-4">Role Permissions</h3>
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="p-2 text-left">Role</th>
              <th className="p-2">Edit</th>
              <th className="p-2">Delete</th>
              <th className="p-2">Assign</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r, i) => (
              <tr key={i} className="hover:bg-gray-700 transition">
                <td className="p-2">{r.role}</td>
                <td className="p-2 text-center">
                  <input type="checkbox" checked={r.canEdit} readOnly />
                </td>
                <td className="p-2 text-center">
                  <input type="checkbox" checked={r.canDelete} readOnly />
                </td>
                <td className="p-2 text-center">
                  <input type="checkbox" checked={r.canAssign} readOnly />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SettingsPage;
