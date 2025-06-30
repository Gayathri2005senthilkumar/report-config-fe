import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header at top */}
      <Header />

      {/* Content Area */}
      <div className="flex flex-1">
        {/* Sidebar on left */}
        <Sidebar />

        {/* Main Content on right */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
