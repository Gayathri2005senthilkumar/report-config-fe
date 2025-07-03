import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FileText,
  MessageSquare,
  Search,
  Filter,
  List,
  Map,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const [showReportSubmenu, setShowReportSubmenu] = useState(false);

  const menuItems = [
    {
      label: "Report Management",
      icon: <FileText />,
      path: null,
      submenu: [
        { label: "Report Types", icon: <List />, path: "/report-types" },
        { label: "Report Configs", icon: <FileText />, path: "/weekly-report" },
        { label: "Column Mappings", icon: <Map />, path: "/column-types" },
      ],
    },
    { label: "Response Fields", icon: <MessageSquare />, path: "/response-fields" },
    { label: "Search Fields", icon: <Search />, path: "/search-fields" },
    { label: "Filter Fields", icon: <Filter />, path: "/filter-fields" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col items-center overflow-y-auto">
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
              className="w-full h-16 bg-gray-700 hover:bg-gray-600 text-white flex flex-col items-center justify-center rounded transition"
            >
              <div className="mb-1">{item.icon}</div>
              <span className="text-xs">{item.label}</span>
            </button>

            {/* Submenu: visually distinct */}
            {item.submenu && showReportSubmenu && (
              <div className="mt-1 space-y-1 pl-4 border-l-2 border-violet-500">
                {item.submenu.map((subItem, subIndex) => (
                  <button
                    key={subIndex}
                    onClick={() => navigate(subItem.path)}
                    className="w-full h-14 bg-gray-600 hover:bg-violet-600 text-white flex flex-col items-start justify-center rounded px-4 transition"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{subItem.icon}</span>
                      <span className="text-sm">{subItem.label}</span>
                    </div>
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
