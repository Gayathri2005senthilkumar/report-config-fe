import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  FileText,
  MessageSquare,
  Search,
  Filter,
  List,
  Map
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const [showReportSubmenu, setShowReportSubmenu] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: <Home />, path: "/dashboard" },
    {
      label: "Report Management",
      icon: <FileText />,
      path: null,
      submenu: [
        { label: "Report Types", icon: <List />, path: "/report-types"},
        { label: "Report Configs", icon: <FileText />, path: "/weekly-report" },
        { label: "Column Mappings", icon: <Map />, path: "/monthly-report" },
      ],
    },
    { label: "Response Fields", icon: <MessageSquare />, path: "/response-fields" },
    { label: "Search Fields", icon: <Search />, path: "/search-fields" },
    { label: "Filter Fields", icon: <Filter />, path: "/filter-fields" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col items-center">
      <div className="space-y-2 w-full">
        {menuItems.map((item, index) => (
          <div key={index} className="w-full">
            <button
              onClick={() => {
                if (item.submenu) {
                  setShowReportSubmenu(!showReportSubmenu);
                } else if (item.path) {
                  navigate(item.path);
                }
              }}
              className="w-full h-20 bg-gray-700 hover:bg-gray-600 text-white flex flex-col items-center justify-center rounded"
            >
              <div className="mb-1">{item.icon}</div>
              <span className="text-xs">{item.label}</span>
            </button>

            {/* Dropdown submenu buttons with same size */}
            {item.submenu && showReportSubmenu && (
              <div className="mt-2 space-y-2">
                {item.submenu.map((subItem, subIndex) => (
                  <button
                    key={subIndex}
                    onClick={() => navigate(subItem.path)}
                    className="w-full h-20 bg-gray-600 hover:bg-gray-500 text-white flex flex-col items-center justify-center rounded"
                  >
                    <div className="mb-1 text-sm">{subItem.icon}</div>
                    <span className="text-xs">{subItem.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
