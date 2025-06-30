import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gray-200 h-screen p-4 shadow-md">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <p className="text-sm font-medium text-gray-600 mb-4">NAVIGATION</p>

      <div className="space-y-2">
        <button
          onClick={() => setShowSubmenu(!showSubmenu)}
          className="w-full flex items-center justify-between bg-white text-black p-2 rounded hover:bg-violet-100"
        >
          <span>Report Management</span>
          <span>{showSubmenu ? "▲" : "▼"}</span>
        </button>

        {showSubmenu && (
          <div className="ml-4 mt-2 space-y-1">
            <button
              className="w-full bg-white text-black p-2 rounded hover:bg-violet-100"
              onClick={() => navigate("/report-types")}
            >
              Report Types
            </button>
            <button
              className="w-full bg-white text-black p-2 rounded hover:bg-violet-100"
              onClick={() => navigate("/weekly-report")}
            >
              Report Configs
            </button>
            <button
              className="w-full bg-white text-black p-2 rounded hover:bg-violet-100"
              onClick={() => navigate("/monthly-report")}
            >
              Column Mappings
            </button>
          </div>
        )}

        <button
          className="w-full bg-white text-black p-2 rounded hover:bg-violet-100"
          onClick={() => navigate("/profile")}
        >
          Response Fields
        </button>
        <button
          className="w-full bg-white text-black p-2 rounded hover:bg-violet-100"
          onClick={() => navigate("/settings")}
        >
          Search Fields
        </button>
        <button
          className="w-full bg-white text-black p-2 rounded hover:bg-violet-100"
          onClick={() => navigate("/filter")}
        >
          Filter Fields
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
