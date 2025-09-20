import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import HeaderBar from "./HeaderBar";

const AdminLayout = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{display:'flex', height:'100vh'}}>
      {/* Sidebar */}
      <div style={{width: '250px', background:'#222', color:'#fff'}}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div style={{flex:1, background:'#111', color:'#fff', padding:'20px'}}>
        <HeaderBar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onLogout={onLogout} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
