import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function DashboardLayout() {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-200 shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-600">Welcome, Gayathri 👋</p>
      </header>

      {/* Content Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-200 p-4 shadow-md">
          <h2 className="text-xl font-bold mb-6 text-black">adminJS</h2>
          <p className="text-sm font-medium text-gray-600 mb-4">NAVIGATION</p>

          <div className="space-y-2">
            {/* Report Management Dropdown */}
            <button
              onClick={() => setShowSubmenu(!showSubmenu)}
              className="w-full flex items-center justify-between bg-white text-black p-2 rounded hover:bg-violet-100 transition"
            >
              <span>Report Management</span>
              <span>{showSubmenu ? "▲" : "▼"}</span>
            </button>

            {showSubmenu && (
              <div className="ml-4 mt-2 space-y-1">
                <SidebarButton label="Report Types" path="/report-types" navigate={navigate} />
                <SidebarButton label="Report Configs" path="/weekly-report" navigate={navigate} />
                <SidebarButton label="Column Mappings" path="/monthly-report" navigate={navigate} />
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Sidebar button as internal component
function SidebarButton({ label, path, navigate }) {
  return (
    <button
      className="w-full bg-white text-black p-2 rounded hover:bg-violet-100 transition"
      onClick={() => navigate(path)}
    >
      {label}
    </button>
  );
}

export default DashboardLayout;
