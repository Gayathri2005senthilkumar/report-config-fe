import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
function DashboardLayout()
{
  const navigate = useNavigate();
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      {/* Sidebar */}
      <div className="w-64 bg-white text-black p-4 shadow-md">
        <h2 className="text-xl font-bold mb-6 text-black">adminJS</h2>


        <p className="text-sm font-medium text-gray-600 mb-4">NAVIGATION</p>

        <div className="space-y-2">
          {/* Dropdown for Report Management */}
          <button
            onClick={() => setShowSubmenu(!showSubmenu)}
            className="w-full flex items-center justify-between w-full bg-white text-black p-2 rounded border border-white hover:bg-violet-100 transition"
          >
            <span>Report Management</span>
            <span>{showSubmenu ? "▲" : "▼"}</span> {/* Unicode arrows */}
          </button>

          {showSubmenu && (
            <div className="ml-4 mt-2 space-y-1">
              <button
                className="w-full bg-white text-black p-2 rounded border border-white hover:bg-violet-100"
                onClick={() => navigate("/report-types")}
              >
                Report Types
              </button>
              <button
                className="w-full bg-white text-black p-2 rounded border border-white hover:bg-violet-100"
                onClick={() => navigate("/weekly-report")}
              >
                Report Configs
              </button>
              <button
                className="w-full bg-white text-black p-2 rounded border border-white hover:bg-violet-100"
                onClick={() => navigate("/monthly-report")}
              >
                Column Mappings
              </button>
            </div>
          )}         

          {/* Other Sidebar Items */}
          <button
          className="w-full bg-white text-black p-2 rounded border border-white hover:bg-violet-100"
          onClick={() => navigate("/profile")}
>
          Response Fields
          </button>


          <button
            className="w-full bg-white text-black p-2 rounded border border-white hover:bg-violet-100"
            onClick={() => navigate("/settings")}
          >
            Search Fields
          </button>
          <button
           className="w-full bg-white text-black p-2 rounded border border-white hover:bg-violet-100"
            onClick={() => navigate("/filter")}
          >
            Filter Fields
          </button>
        </div>
      </div> 

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow p-4">
          <h1 className="text-2xl font-semibold text-gray-800"></h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
 export default DashboardLayout;