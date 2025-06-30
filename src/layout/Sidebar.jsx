import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gray-200 p-4 shadow-md">
      <h2 className="text-xl font-bold mb-6 text-black">adminJS</h2>
      <p className="text-sm font-medium text-gray-600 mb-4">NAVIGATION</p>

      <div className="space-y-2">
        <button className="w-full bg-white text-black p-2 rounded" onClick={() => navigate("/report-types")}>Report Types</button>
        <button className="w-full bg-white text-black p-2 rounded" onClick={() => navigate("/weekly-report")}>Report Configs</button>
        <button className="w-full bg-white text-black p-2 rounded" onClick={() => navigate("/monthly-report")}>Column Mappings</button>
      </div>
    </div>
  );
}

export default Sidebar;
