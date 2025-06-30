import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gray-200 p-4 shadow-md h-full">
      <h2 className="text-xl font-bold mb-6 text-black">adminJS</h2>
      <p className="text-sm font-medium text-gray-600 mb-4">NAVIGATION</p>

      <div className="space-y-2">
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
  );
}

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

export default Sidebar;
